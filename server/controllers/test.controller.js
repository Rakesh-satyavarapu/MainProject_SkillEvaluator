require("dotenv").config();

const mongoose = require("mongoose");
const Skill = require("../models/skill.model");
const User = require("../models/user.model");
const Attempt = require("../models/testAttempt.model");
const Question = require("../models/question.model");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { getYoutubeVideos } = require("../youtubeServices.js");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* ------------------------- Utility: Normalize AI Data ------------------------- */
const normalizeQuestion = (q) => {
  const cleanedOptions = q.options.map((opt) =>
    opt.replace(/^[A-Da-d]\.\s*/, "").trim()
  );

  let correct = q.correctAnswer;
  if (/^[A-Da-d]$/.test(correct)) {
    const idx = correct.toUpperCase().charCodeAt(0) - 65;
    correct = cleanedOptions[idx] || correct;
  } else {
    correct = correct.replace(/^[A-Da-d]\.\s*/, "").trim();
  }

  return { ...q, options: cleanedOptions, correctAnswer: correct };
};

/* ---------------------- 1️⃣ Generate AI Skill Questions ----------------------- */
exports.generateSkillQuestions = async (req, res) => {
  try {
    const { skillId, level } = req.body;
    if (!skillId || !level)
      return res.status(400).json({ message: "skillId and level are required" });

    const skill = await Skill.findById(skillId);
    if (!skill || !skill.name)
      return res.status(404).json({ message: "Skill not found or missing name" });

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
      Generate 60 multiple-choice questions for "${skill.name}" at "${level}" level.
      Each question must include:
        - mainTopic
        - subTopic
        - topic
        - question text
        - options: ["A","B","C","D"]
        - correctAnswer (text, not "A"/"B")
      Return only pure JSON, no explanation or markdown.
    `;

    const result = await model.generateContent(prompt);
    const rawText = result.response?.text?.() || "";

    const sanitizeJson = (text) =>
      text
        .replace(/```json|```/g, "")
        .replace(/,\s*}/g, "}")
        .replace(/,\s*]/g, "]")
        .replace(/[\u0000-\u001F]+/g, "")
        .trim();

    let questions;
    try {
      questions = JSON.parse(sanitizeJson(rawText));
    } catch (err) {
      return res
        .status(500)
        .json({ message: "AI returned invalid JSON", error: err.message });
    }

    if (!Array.isArray(questions) || !questions.length)
      return res.status(500).json({ message: "AI did not generate valid questions" });

    // Normalize & attach metadata
    questions = questions.map((q) => ({
      ...normalizeQuestion(q),
      skill: skillId,
      level,
    }));

    // Remove duplicates
    const existing = await Question.find({ skill: skillId, level }).select("question");
    const existingTexts = existing.map((q) => q.question);
    const filtered = questions.filter((q) => !existingTexts.includes(q.question));

    if (!filtered.length)
      return res.status(200).json({ message: "No new questions (all duplicates)" });

    const saved = await Question.insertMany(filtered);

    res.status(201).json({
      message: "AI-generated questions saved successfully",
      totalGenerated: questions.length,
      totalAdded: saved.length,
    });
  } catch (err) {
    console.error("AI generation error:", err);
    res.status(500).json({
      message: "Failed to generate questions",
      error: err.message,
    });
  }
};

/* ---------------------- 2️⃣ Get Random Test Questions ----------------------- */
exports.randomTestQuestions = async (req, res) => {
  try {
    const { skillId, level } = req.body;
    if (!skillId || !level)
      return res.status(400).json({ message: "skillId and level are required" });

    const user = await User.findById(req.user._id);
    const isRegistered = user.registeredSkills.some(
      (s) => s.skill.toString() === skillId && s.status === "registered"
    );
    if (!isRegistered)
      return res
        .status(403)
        .json({ message: "You must register this skill before attempting the test." });

    const skillObj = new mongoose.Types.ObjectId(skillId);
    const questions = await Question.aggregate([
      { $match: { skill: skillObj, level } },
      { $sample: { size: 30 } }, // adjust number of questions as needed
    ]);

    if (!questions.length)
      return res
        .status(404)
        .json({ message: "No questions found for this skill/level" });

    const attempt = await Attempt.create({
      user: req.user._id,
      skill: skillObj,
      level,
      totalQuestions: questions.length,
      questions: questions.map((q) => ({ questionId: q._id })),
      submitted: false,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    res.status(200).json({
      message: "Random test generated successfully",
      attemptId: attempt._id,
      data: questions.map((q) => ({
        _id: q._id,
        question: q.question,
        options: q.options,
        mainTopic: q.mainTopic,
        subTopic: q.subTopic,
        topic: q.topic,
        level: q.level,
        answer: null, // hide correct answer
      })),
    });
  } catch (err) {
    console.error("Random test error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ------------------------- 3️⃣ Badge Logic Helper --------------------------- */
const checkAndAwardBadges = async (user, attempt) => {
  const newBadges = [];
  if (!user.badges) user.badges = [];
  if (!user.badgeHistory) user.badgeHistory = [];

  const addBadge = (badge) => {
    if (!user.badges.includes(badge)) {
      user.badges.push(badge);
      user.badgeHistory.push({ badge, earnedAt: new Date() });
      newBadges.push(badge);
    }
  };

  const totalTests = await Attempt.countDocuments({ user: user._id, submitted: true });
  const skillTests = await Attempt.countDocuments({
    user: user._id,
    skill: attempt.skill,
    submitted: true,
  });
  const registeredSkills = user.registeredSkills.filter(
    (s) => s.status === "registered"
  ).length;

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentTests = await Attempt.countDocuments({
    user: user._id,
    submitted: true,
    takenAt: { $gte: oneWeekAgo },
  });

  const prev = await Attempt.findOne({
    user: user._id,
    skill: attempt.skill,
    submitted: true,
    _id: { $ne: attempt._id },
  }).sort({ takenAt: -1 });

  // 🏅 Badge Conditions
  if (totalTests >= 1) addBadge("first-test");
  if (attempt.score === 100) addBadge("perfect-score");
  if (skillTests >= 10) addBadge("skill-master");
  if (registeredSkills >= 3) addBadge("multi-skill");
  if (recentTests >= 5) addBadge("consistency");
  if (prev && attempt.score - prev.score >= 20) addBadge("improvement");
  if (attempt.level === "advanced" && attempt.score >= 90) addBadge("expert");
  if (totalTests >= 25) addBadge("dedicated");

  return newBadges;
};

/* ---------------------------- 4️⃣ Submit Test ----------------------------- */
exports.submitTest = async (req, res) => {
  try {
    const { attemptId, answers } = req.body;
    if (!attemptId || typeof answers !== "object")
      return res
        .status(400)
        .json({ message: "Missing or invalid attemptId and answers" });

    const attempt = await Attempt.findById(attemptId).populate({
      path: "questions.questionId",
      select: "correctAnswer topic subTopic",
    });
    if (!attempt) return res.status(404).json({ message: "Attempt not found" });
    if (attempt.submitted)
      return res.status(400).json({ message: "This test is already submitted" });

    // ✅ Evaluate answers
    attempt.questions.forEach((q) => {
      const userAnswer = answers[q.questionId._id.toString()] ?? null;
      q.selectedAnswer = userAnswer;
      q.isCorrect =
        userAnswer &&
        q.questionId.correctAnswer &&
        userAnswer.trim().toLowerCase() ===
          q.questionId.correctAnswer.trim().toLowerCase();
    });

    attempt.correctAnswers = attempt.questions.filter((q) => q.isCorrect).length;
    attempt.totalQuestions = attempt.questions.length;
    attempt.score = Math.round(
      (attempt.correctAnswers / attempt.totalQuestions) * 100
    );

    // Weak topics
    const weakTopics = new Set();
    attempt.questions.forEach((q) => {
      if (!q.isCorrect) {
        weakTopics.add(q.questionId.subTopic?.trim() || q.questionId.topic?.trim());
      }
    });
    attempt.weakTopics = Array.from(weakTopics);

    // YouTube learning resources
    const skillDoc = await Skill.findById(attempt.skill);
    attempt.youtubeVideoLinks = await getYoutubeVideos(
      skillDoc?.name || "Skill",
      attempt.weakTopics,
      "en"
    );

    // Finalize attempt
    attempt.submitted = true;
    attempt.expiresAt = null;
    attempt.takenAt = new Date();
    await attempt.save();

    // Update user progress + badges
    const user = await User.findById(attempt.user);
    const regSkill = user.registeredSkills.find(
      (s) => s.skill.toString() === attempt.skill.toString()
    );

    if (regSkill && attempt.score >= 75) {
      if (regSkill.level === "beginner") regSkill.level = "intermediate";
      else if (regSkill.level === "intermediate") regSkill.level = "advanced";
      regSkill.lastUpdated = new Date();
    }

    const newBadges = await checkAndAwardBadges(user, attempt);
    await user.save();

    res.status(200).json({
      message: "Test submitted successfully",
      score: attempt.score,
      correctAnswers: attempt.correctAnswers,
      totalQuestions: attempt.totalQuestions,
      weakTopics: attempt.weakTopics,
      youtubeVideoLinks: attempt.youtubeVideoLinks,
      newBadges,
    });
  } catch (err) {
    console.error("Submit test error:", err);
    res.status(500).json({
      message: "Something went wrong while submitting test",
      error: err.message,
    });
  }
};

/* --------------------------- 5️⃣ Test History ----------------------------- */
exports.getTestHistoryBySkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    if (!skillId)
      return res.status(400).json({ message: "Skill ID is required" });

    const attempts = await Attempt.find({
      skill: skillId,
      user: req.user._id,
      submitted: true,
    })
      .populate({
        path: "questions.questionId",
        select: "question mainTopic subTopic topic options correctAnswer",
      })
      .populate({ path: "skill", select: "name description" })
      .sort({ takenAt: -1 });

    res.status(200).json({ attempts });
  } catch (err) {
    console.error("Fetch history error:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

/* ----------------------------- 6️⃣ Get Attempt ----------------------------- */
exports.getAttemptById = async (req, res) => {
  try {
    const { attemptId } = req.params;
    if (!attemptId)
      return res.status(400).json({ message: "Attempt ID is required" });

    const attempt = await Attempt.findById(attemptId).populate({
      path: "questions.questionId",
      select: "question options correctAnswer topic subTopic",
    });

    if (!attempt) return res.status(404).json({ message: "Attempt not found" });
    res.status(200).json({ attempt });
  } catch (err) {
    console.error("Fetch attempt error:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};
