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
    },
    role:{
            type:String,
            enum:["user","admin"],
            default:"user"
        },
    verifyOtp: { type: String, default: '' },
    verifyOtpExpiresAt: { type: Number, default: 0 },
    registeredSkills:[
      {
        skill: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Skill',
          required: true
        },
        status:{
            type:String,
            enum:["registered","withdrew"],
            default:"registered"
        },
        level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        default: "beginner"
        },
        tests:[{type: mongoose.Schema.Types.ObjectId, ref: 'Attempt'}],
        // score: { type: Number, default: 0 },
        // quizzesTaken: { type: Number, default: 0 },
        // correctAnswers: { type: Number, default: 0 },
        // totalQuestions: { type: Number, default: 0 },
        lastUpdated: { type: Date, default: Date.now }}],
        badges: [{
        type: String,
        enum: [
            'first-test',           // Completed first test
            'perfect-score',        // Got 100% on any test
            'skill-master',         // Completed 10 tests in a skill
            'multi-skill',          // Registered for 3+ skills
            'consistency',          // Completed 5 tests in a week
            'improvement',          // Improved score by 20% between tests
            'expert',               // Got 90%+ on advanced level test
            'dedicated'             // Completed 25 total tests
        ]
        }],
        badgeHistory: [{
            badge: String,
            earnedAt: { type: Date, default: Date.now }
        }]
},
{
    timestamps:true
})

module.exports = mongoose.model('User',userSchema)