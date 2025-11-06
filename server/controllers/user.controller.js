let userSchema = require('../models/user.model');
let skillSchema = require('../models/skill.model');
let Attempt = require('../models/testAttempt.model');

require('dotenv').config();

/* ===============================
   📘 Register Skill
================================= */
exports.registeredSkill = async (req, res) => {
  try {
    const { skill, level } = req.body;

    let user = await userSchema.findById(req.user.id);
    let findSkill = await skillSchema.findById(skill);

    if (!findSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    let existingSkill = user.registeredSkills.find(
      (s) => s.skill.toString() === findSkill.id
    );

    if (existingSkill && existingSkill.status === "registered") {
      return res.status(400).json({ message: "Skill already registered" });
    }

    if (existingSkill && existingSkill.status === "withdrew") {
      existingSkill.status = "registered";
      existingSkill.level = level;
    } else {
      user.registeredSkills.push({ skill, level, status: "registered" });
    }

    // Add user to skill's registeredUsers if not already present
    if (!findSkill.registeredUsers.includes(req.user.id)) {
      findSkill.registeredUsers.push(req.user.id);
    }

    await user.save();
    await findSkill.save();

    res.status(200).json({ message: "Skill registered successfully" });
  } catch (error) {
    console.error("❌ Register Skill Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

/* ===============================
   🧾 Withdraw Skill
================================= */
exports.withdrawSkill = async (req, res) => {
  try {
    const { skillId } = req.body;
    const userId = req.user.id;

    if (!skillId) return res.status(400).json({ message: "Skill ID is required" });

    // Update user (mark skill as withdrew)
    await userSchema.findByIdAndUpdate(
      userId,
      { $set: { "registeredSkills.$[elem].status": "withdrew" } },
      { arrayFilters: [{ "elem.skill": skillId }] }
    );

    // Update skill (remove user from registeredUsers)
    await skillSchema.findByIdAndUpdate(skillId, {
      $pull: { registeredUsers: userId },
    });

    res.json({ message: "Skill withdrawn successfully" });
  } catch (err) {
    console.error("❌ Withdraw Skill Error:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   👥 Get All Users
================================= */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userSchema.find().select("-password");
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("❌ Get All Users Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/* ===============================
   👤 Get User Details (Profile)
================================= */
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch user with registered skills
    const user = await userSchema
      .findById(userId)
      .select("-password")
      .populate({
        path: "registeredSkills.skill",
        select: "name description",
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compute stats per skill
    const skillStats = await Promise.all(
      user.registeredSkills.map(async (regSkill) => {
        const skillId = regSkill.skill._id;
        const attempts = await Attempt.find({
          user: userId,
          skill: skillId,
          submitted: true,
        });

        const totalTests = attempts.length;
        const avgScore =
          totalTests > 0
            ? attempts.reduce((sum, a) => sum + (a.score || 0), 0) / totalTests
            : 0;
        const maxScore =
          totalTests > 0
            ? Math.max(...attempts.map((a) => a.score || 0))
            : 0;

        return {
          skillId,
          skillName: regSkill.skill.name,
          level: regSkill.level,
          status: regSkill.status,
          totalTests,
          avgScore: Number(avgScore.toFixed(2)),
          maxScore,
        };
      })
    );

    // ✅ Include badges and badgeHistory in response
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        badges: user.badges || [],
        badgeHistory: user.badgeHistory || [],
        registeredSkills: skillStats,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("❌ Get User Details Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/* ===============================
   ✏️ Update Name
================================= */
exports.updateName = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    if (!name || name.trim().length < 3) {
      return res
        .status(400)
        .json({ message: "Name must be at least 3 characters long" });
    }

    const user = await userSchema
      .findByIdAndUpdate(
        userId,
        { name: name.trim() },
        { new: true }
      )
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Name updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        badges: user.badges,
      },
    });
  } catch (error) {
    console.error("❌ Update Name Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/* ===============================
   ❌ Delete User
================================= */
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userSchema.findByIdAndDelete(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("❌ Delete User Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
