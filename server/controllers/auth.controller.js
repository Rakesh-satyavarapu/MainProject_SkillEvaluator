let userSchema = require('../models/user.model.js')

let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')

exports.register = async(req,res) =>{
    let {name,email,password,role} = req.body;
    try{
        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(password,salt)
        let user = await userSchema.findOne({email})
        if(user)
        {
            return res.status(409).json({msg:'user already existed'})
        }
        let userDetails = await userSchema.create({name,email,password:hash,role:role || 'user'})
        let token = jwt.sign({id:userDetails._id},process.env.SECRET,{expiresIn:'7d'})
        res.cookie('token',token,
            {
                maxAge:7*24*60*60*1000,
                httpOnly:true,
                sameSite: "strict"
            })
        return res.status(201).json(userDetails)
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({msg:"internal server error"})
    }
}

exports.login = async(req,res) =>{
    let {email,password} = req.body;
    try{
        let user = await userSchema.findOne({email})
        if(user)
        {
            let result = await bcrypt.compare(password,user.password)

            if(result){
            let token = jwt.sign({id:user._id},process.env.SECRET,{expiresIn:'7d'})
            res.cookie('token',token,
            {
                maxAge:7*24*60*60*1000,
                httpOnly:true,
                sameSite: "strict"
            })
            return res.status(200).json(user)
            }
            else{
                 return res.status(401).json({msg:"password is incorrect"})
            }
        }
        else
        {
         return res.status(401).json({msg:"Invalid Credentials"})   
        }
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({msg:"internal server error"})
    }
}

exports.logout = async(req,res) =>{
    try{
        res.cookie('token','',{maxAge:0})
        return res.status(200).json({msg:"logged out successfully"})
    }
    catch(err)
    {
        return res.status(500).json({msg:"Internal server error"})
    }
}

exports.userLoggedIn = async(req,res) =>{
    try{
        let user = await userSchema.findById(req.user.id).select('-password');
        if(!user) return res.status(404).json({msg:"User not found"})
        return res.status(200).json(user)
    }
    catch(err)
    {
        return res.status(500).json({msg:"Internal server error"})
    }
}   