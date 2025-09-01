let mongoose = require('mongoose')

let skillSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    description:String, 
    registeredUsers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
})

module.exports = mongoose.model('Skill',skillSchema)