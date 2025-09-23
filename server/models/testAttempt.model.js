const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  skill: { type: mongoose.Schema.Types.ObjectId, ref: "Skill", required: true },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true,
  },
  questions: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
      selectedAnswer: { type: String, default: null },
      isCorrect: { type: Boolean, default: false },
    },
  ],
  submitted: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  correctAnswers: { type: Number, default: 0 },
  totalQuestions: { type: Number, default: 0 },
  weakTopics: [String],
  takenAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Attempt", attemptSchema);
