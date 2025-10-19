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

exports.getSkillById = async (req, res) => {
  const { skillId } = req.params;
  try {
    const skill = await skillSchema.findById(skillId);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.status(200).json({ message: 'Skill fetched successfully', data: skill });
  } catch (error) {
    console.error('Error fetching skill:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAllSkills = async (req, res) => {
    try {
        let skills = await skillSchema.find();
        res.status(200).json({message: "Skills retrieved successfully", data: skills});
    } catch (error) {
        console.error("Error retrieving skills:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.deleteSkill = async (req, res) => {
    let {skillId} = req.params;
    try {
        let deletedSkill = await skillSchema.findByIdAndDelete(skillId);
        if (!deletedSkill) {
            return res.status(404).json({message: "Skill not found"});
        }
        res.status(200).json({message: "Skill deleted successfully", data: deletedSkill});
    } catch (error) {
        console.error("Error deleting skill:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.updateSkill = async (req, res) => {
    let {skillId} = req.params;
    let {name, description} = req.body;
    try {
        let updatedSkill = await skillSchema.findByIdAndUpdate(skillId, {name, description}, {new: true});
        if (!updatedSkill) {
            return res.status(404).json({message: "Skill not found"});
        }
        res.status(200).json({message: "Skill updated successfully", data: updatedSkill});
    } catch (error) {
        console.error("Error updating skill:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

