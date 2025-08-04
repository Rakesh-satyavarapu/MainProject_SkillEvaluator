let userSchema = require('../models/user.model.js')

let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')

exports.register = async(req,res) =>{
    let {name,email,password} = req.body;
    try{
        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(salt,password)
        let user = await userSchema.find({name})
        if(user)
        {
            return res.json({msg:'user already existed'})
        }
        let userDetails = await userSchema.create({name,email,password:hash})
        let token = jwt.sign(userDetails)
        return res.status(301).json({msg:"user created successfully"})
    }
    catch(err)
    {
        return res.status(500).json({msg:"internal server error"})
    }
}