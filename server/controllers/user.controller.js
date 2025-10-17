let userSchema = require('../models/user.model')
let skillSchema = require('../models/skill.model')


require('dotenv').config();

exports.registeredSkill = async (req, res) => {
    try {
        const { skill, level } = req.body;

        let user = await userSchema.findById(req.user.id);
        let findSkill = await skillSchema.findById(skill);

        if (!findSkill) {
            return res.status(404).json({ message: "Skill not found" });
        }

        let existingSkill = user.registeredSkills.find(s => s.skill.toString() === findSkill.id);

        if (existingSkill && existingSkill.status === 'registered') {
            return res.status(400).json({ message: "Skill already registered" });
        }

        if (existingSkill && existingSkill.status === 'withdraw') {
            existingSkill.status = 'registered';
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
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.withdrawSkill = async (req, res) => {
    try {
        const { skillId } = req.body;
        const userId = req.user.id;

        if (!skillId) return res.status(400).json({ message: "Skill ID is required" });

        // Update user (mark skill as withdrawn)
        await userSchema.findByIdAndUpdate(
            userId,
            { $set: { "registeredSkills.$[elem].status": "withdraw" } },
            { arrayFilters: [{ "elem.skill": skillId }] }
        );

        // Update skill (remove user from registeredUsers)
        await skillSchema.findByIdAndUpdate(
            skillId,
            { $pull: { registeredUsers: userId } }
        );

        res.json({ message: "Skill withdrawn successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


