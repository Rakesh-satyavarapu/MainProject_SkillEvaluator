let express = require('express')

let{registeredSkill,withdrawSkill} = require('../controllers/user.controller')
let {randomTestQuestions} = require('../controllers/test.controller');

let router = express.Router()

router.post('/skillRegister',registeredSkill)
router.post('/skillWithdraw',withdrawSkill)
router.post('/takeTest',randomTestQuestions);

module.exports = router