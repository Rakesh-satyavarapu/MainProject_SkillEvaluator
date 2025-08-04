let express = require('express')
const {register} = require('../controllers/auth.controller.js')

let router = express.Router()

router.post('/register',register)

module.exports= router