let mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        minlength:[3,'Name should be atleast 3 characters'],
        required:true,
    },
    email:
    {
        type:String,
        required:true,
        unique:true,
        match:[
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address'
        ]
    },
    password:
    {
        type:String,
        required:true,
        minlength:[6,"Password should contains 6 characters"]
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('user',userSchema)