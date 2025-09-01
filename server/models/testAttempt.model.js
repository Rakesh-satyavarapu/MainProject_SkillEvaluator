const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },

  questions: [{
    question: String,
    options: [String],
    correctAnswer: String,
    selectedAnswer: String,
    topic: String,
    isCorrect: Boolean
  }],

  score: { type: Number, default: 0 },
  correctAnswers: { type: Number, default: 0 },
  totalQuestions: { type: Number, default: 0 },
  weakTopics: [String],
  takenAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Auto-calc
attemptSchema.pre('save', function(next) {
  if (this.questions && this.questions.length > 0) {
    this.totalQuestions = this.questions.length;
    this.correctAnswers = this.questions.filter(q => q.isCorrect).length;
    this.score = Math.round((this.correctAnswers / this.totalQuestions) * 100);
    this.weakTopics = this.questions
      .filter(q => !q.isCorrect)
      .map(q => q.topic);
  }
  next();
});

module.exports = mongoose.model('Attempt', attemptSchema);
