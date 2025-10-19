let express = require('express');

let {addSkill,getAllSkills,getSkillById} = require('../controllers/skill.controller');

let router = express.Router();

router.post('/addSkill',addSkill)
router.get('/getSkills',getAllSkills)
router.get('/getSkill/:skillId',getSkillById)

module.exports = router;