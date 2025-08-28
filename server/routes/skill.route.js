let express = require('express');

let {addSkill} = require('../controllers/skill.controller');
let router = express.Router();

router.post('/AddSkill',addSkill)

module.exports = router;