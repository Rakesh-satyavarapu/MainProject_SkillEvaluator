let express = require('express');

let {addSkill,getAllSkills} = require('../controllers/skill.controller');

let router = express.Router();

router.post('/addSkill',addSkill)
router.get('/getSkills',getAllSkills)

module.exports = router;