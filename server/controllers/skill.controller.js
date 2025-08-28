let skillSchema = require('../models/skill.model');

exports.addSkill = async (req, res) => {
    let {name,description} = req.body;
    try {
        let existingSkill = await skillSchema.findOne({name});
        if(existingSkill) {
            return res.status(400).json({message: "Skill already exists"});
        }
        let newSkill = await skillSchema.create({name,description});
        res.status(201).json({message: "Skill added successfully", data: newSkill});
    } catch (error) {
        console.error("Error adding skill:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}