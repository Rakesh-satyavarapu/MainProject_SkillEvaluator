let express = require('express')

let{registeredSkill,withdrawSkill} = require('../controllers/user.controller')

let router = express.Router()

router.post('/skillRegister',registeredSkill)
router.post('/skillWithdraw',withdrawSkill)

module.exports = router