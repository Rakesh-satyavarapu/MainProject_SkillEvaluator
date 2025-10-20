let User = require("../models/user.model.js");
let Skill = require("../models/skill.model.js");
let Question = require("../models/question.model.js");
let Attempt = require("../models/testAttempt.model.js"); // if you store test attempts

exports.getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSkills = await Skill.countDocuments();
    const totalQuestions = await Question.countDocuments();
    const totalAttempts = await Attempt.countDocuments();

    res.json({
      success: true,
      data: {
        totalUsers,
        totalSkills,
        totalQuestions,
        totalAttempts,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
};
