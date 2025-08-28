let jwt = require('jsonwebtoken')

let userSchema = require('../models/user.model.js')

exports.protectedRoute = async(req,res,next)=>{
try{
    let token = req.cookies.token
    if(!token)
    {
        return res.status(401).json({msg:"user not logged in"})
    }
    let decode = jwt.verify(token,process.env.SECRET)
    if(!decode)
    {
        return res.status(401).json({msg:"un-authorized accessing"})
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