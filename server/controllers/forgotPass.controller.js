let userSchema = require('../models/user.model');
let bcrypt = require('bcrypt');

//check user existed or not for reset password
exports.findUser = async (req, res) => {
    try {
        const user = await userSchema.findOne({ email: req.params.email });

        if (user) {
            return res.json({ userExist: true });
        } else {
            return res.json({ userExist: false });
        }
    } catch (error) {
        console.log('Error finding user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

//save otp and expiry time
exports.saveOtp = async (req, res) => {
    const { email, otp, expiryTime } = req.body;

    try {
        let user = await userSchema.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Save OTP and expiration time
        user.verifyOtp = otp;
        user.verifyOtpExpiresAt = expiryTime;
        await user.save();

        res.json({ success: true, message: "OTP saved successfully" });
    } catch (error) {
        console.error("Error saving OTP:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//check otp 
exports.confirmOtp = async (req, res) => {
    try {
        const user = await userSchema.findOne({ email: req.params.userEmail });
        if (user) {
            return res.send(user)
        } else {
            return res.json({ userExist: false });
        }
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

//set new password
exports.setPassword = async(req,res)=>{
    let email = req.params.email
    let {pass} = req.body
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(pass,salt,async(err,hash)=>{    
            let user = await userSchema.findOneAndUpdate({email},{password:hash},{new:true})
            console.log(`password reset successfully for ${user.name}`)
            res.json({'set':true})
        })
})
}