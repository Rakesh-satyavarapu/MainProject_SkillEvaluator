require("dotenv").config();

const Question = require("../models/question.model");
const skillSchema = require('../models/skill.model');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const normalizeQuestion = (q) => {
  const cleanedOptions = q.options.map(opt =>
    opt.replace(/^[A-Da-d]\.\s*/, "").trim()
  );

  let correct = q.correctAnswer;

  // if AI returned letter (A-D), convert to option text
  if (/^[A-Da-d]$/.test(correct)) {
    const idx = correct.toUpperCase().charCodeAt(0) - 65;
    correct = cleanedOptions[idx] || correct;
  } else {
    correct = correct.replace(/^[A-Da-d]\.\s*/, "").trim();
  }

  return {
    ...q,
    options: cleanedOptions,
    correctAnswer: correct
  };
};

exports.generateSkillQuestions = async (req, res) => {
  try {
    const { skillId, level } = req.body;

    if (!skillId || !level) {
      return res.status(400).json({ message: "skillId and level are required" });
    }

    const skill = await skillSchema.findById(skillId);
    if (!skill || !skill.name) {
      return res.status(404).json({ message: "Skill not found or missing name" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Generate 60 multiple-choice questions for the skill "${skill.name}" at "${level}" level.
      Each question must have:
        - A clearly defined topic
        - 4 options (A, B, C, D) but answers should be text values
        - The correct answer (write the actual text of the correct option, not just "A" or "B")
      Return strictly valid JSON ONLY. Do NOT include markdown, code fences, or any explanation.

      Format:
      [
        {
          "topic": "string",
          "question": "string",
          "options": ["A","B","C","D"], 
          "correctAnswer": "string" 
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    const rawText = result.response?.text?.() || "";

    const sanitizeJson = (text) => {
      return text
        .replace(/```json|```/g, "")
        .replace(/,\s*}/g, '}')
        .replace(/,\s*]/g, ']')
        .replace(/[\u0000-\u001F]+/g, '')
        .trim();
    };

    const cleanedText = sanitizeJson(rawText);

    let questions;
    try {
      questions = JSON.parse(cleanedText);
    } catch (err) {
      return res.status(500).json({ message: "AI returned invalid JSON", error: err.message });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(500).json({ message: "AI did not generate any questions" });
    }

    // Normalize + attach skill and level
    questions = questions.map(q => {
      const normalized = normalizeQuestion(q);
      return { ...normalized, skill: skillId, level };
    });

    // Remove duplicates
    const existingQuestions = await Question.find({ skill: skillId, level }).select("question");
    const existingTexts = existingQuestions.map(q => q.question);

    const filteredQuestions = questions.filter(q => !existingTexts.includes(q.question));

    if (filteredQuestions.length === 0) {
      return res.status(200).json({ message: "No new questions; all duplicates" });
    }

    const saved = await Question.insertMany(filteredQuestions);

    res.status(201).json({
      message: "AI-generated questions saved successfully",
      totalGenerated: questions.length,
      totalAdded: saved.length,
      data: saved
    });

  } catch (err) {
    console.error("AI generation error:", err);
    res.status(500).json({
      message: "Failed to generate questions",
      error: err.message,
      details: err.errorDetails || null
    });
  }
};

const mongoose = require("mongoose");
const Skill = require("../models/skill.model");
const attempt = require("../models/testAttempt.model.js");


exports.randomTestQuestions = async (req, res) => {
  try {
    const { skillId, level } = req.body;

    if (!skillId || !level) {
      return res.status(400).json({ message: "skillId and level are required" });
    }

    const skillObjectId = new mongoose.Types.ObjectId(skillId);

    const skill = await Skill.findById(skillObjectId);
    if (!skill || !skill.name) {
      return res.status(404).json({ message: "Skill not found or missing name" });
    }

    const questions = await Question.aggregate([
      { $match: { skill: skillObjectId, level } },
      { $sample: { size: 50 } }
    ]);

    if (!questions || questions.length === 0) {
      console.log("No questions found. Generating new ones...");
      // return await generateSkillQuestions(req, res); // enable later
      return res.status(404).json({ message: "No questions found for this skill/level" });
    }

    await attempt.create({
      user: req.user._id,
      skill: skillObjectId,
      level,
      questions
    });

    res.status(200).json({
      message: "Random test questions retrieved successfully and saved in the attempt model",
      data: questions
    });

  } catch (err) {
    console.error("Random test questions error:", err);
    res.status(500).json({
      message: "Failed to retrieve random test questions",
      error: err.message,
      details: err.errorDetails || null
    });
  }
};