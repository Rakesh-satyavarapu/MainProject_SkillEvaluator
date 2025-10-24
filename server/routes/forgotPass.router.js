let express = require('express');
let { findUser, saveOtp, confirmOtp, setPassword } = require('../controllers/forgotPass.controller');

let router = express.Router();

router.get('/Finduser/:email', findUser);
router.post('/save-otp', saveOtp);
router.get('/confirmOtp/:userEmail', confirmOtp);
router.post('/setPass/:email', setPassword);

module.exports = router;
