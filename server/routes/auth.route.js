let express = require('express')
const {register,login,logout,userLoggedIn} = require('../controllers/auth.controller.js')
const {protectedRoute} = require('../middlewares/auth.middleware.js')

let router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/check',protectedRoute,userLoggedIn)

module.exports= router 
