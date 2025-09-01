let express = require('express');
let {generateSkillQuestions} = require('../controllers/test.controller');


let router = express.Router();

router.post('/generateTest',generateSkillQuestions);

module.exports = router;