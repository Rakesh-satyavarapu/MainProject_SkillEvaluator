let express = require('express')
const {register,login,logout} = require('../controllers/auth.controller.js')

let router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)

module.exports= router 
