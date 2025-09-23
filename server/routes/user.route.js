let express = require('express')

let{registeredSkill,withdrawSkill} = require('../controllers/user.controller')
let {randomTestQuestions,submitTest} = require('../controllers/test.controller');

let router = express.Router()

router.post('/skillRegister',registeredSkill)
router.post('/skillWithdraw',withdrawSkill)
router.post('/takeTest',randomTestQuestions);
router.post('/submitTestAnswers',submitTest);


module.exports = router