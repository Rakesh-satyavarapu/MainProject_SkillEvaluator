const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }], // multiple options
  correctAnswer: { type: String, required: true }, // the right option
  selectedAnswer: { type: String }, // what user picked
  topic: { type: String, required: true },
  isCorrect: { type: Boolean, default: false } // track correctness per Q
});

const testSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  questions: [questionSchema],
  score: { type: Number, required: true },
  totalQuestions: { type: Number, default:questions.length },
  correctAnswers: { type: Number, required: true },
  takenAt: { type: Date, default: Date.now },

  weakTopics: [
    {
      topic: { type: String, required: true, default:null},
    }
  ]
});

module.exports = mongoose.model('Test', testSchema);
