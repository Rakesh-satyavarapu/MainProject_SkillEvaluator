let jwt = require('jsonwebtoken')

let userSchema = require('../models/user.model.js')

exports.protectedRoute = async(req,res,next)=>{
try{
    let token = req.cookies.token
    if(!token)
    {
        return res.status(401).json({msg:"user not logged in"})
    }
    let decode;
    try {
      decode = jwt.verify(token, process.env.SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ msg: "Session expired, please log in again" });
      }
      return res.status(401).json({ msg: "Invalid token" });
    }
    let user = await userSchema.findById(decode.id)
    if(!user)
    {
        return res.status(404).json({msg:"user not found"})
    }
    req.user=user;
    next();
}
catch(err)
{
    return res.status(500).json({msg:"Internal server error"})
}
}