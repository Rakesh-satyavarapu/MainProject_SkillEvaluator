let express = require('express')
const {userLoggedIn} = require('../controllers/auth.controller.js')
const {generateSkillQuestions} = require('../controllers/test.controller.js')
const {getAllSkills,addSkill,deleteSkill} = require('../controllers/skill.controller.js')

let router = express.Router()

router.post('/generateQuestions',generateSkillQuestions)
router.post('/addSkill',addSkill)
router.get('/getSkills',getAllSkills)
router.delete('/deleteSkill/:skillId',deleteSkill)

module.exports= router 
