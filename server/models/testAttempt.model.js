// const mongoose = require("mongoose");

// const attemptSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   skill: { type: mongoose.Schema.Types.ObjectId, ref: "Skill", required: true },
//   level: {
//     type: String,
//     enum: ["beginner", "intermediate", "advanced"],
//     required: true,
//   },
//   questions: [
//     {
//       questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
//       selectedAnswer: { type: String, default: null },
//       isCorrect: { type: Boolean, default: false },
//     },
//   ],
//   submitted: { type: Boolean, default: false },
//   score: { type: Number, default: 0 },
//   correctAnswers: { type: Number, default: 0 },
//   totalQuestions: { type: Number, default: 0 },
//   weakTopics: [String],
//   youtubeVideoLinks: [
//     {
//       topic: { type: String },
//       links: [{ type: String }]
//     }
//   ],
//   takenAt: { type: Date, default: Date.now },
// }, { timestamps: true });

// module.exports = mongoose.model("Attempt", attemptSchema);

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
  youtubeVideoLinks: [
    {
      topic: { type: String },
      links: [{ type: String }]
    }
  ],
  takenAt: { type: Date, default: Date.now },

  // ✅ New field for TTL auto-delete
  expiresAt: { type: Date, default: null }
}, { timestamps: true });

// ✅ TTL index: document auto-deleted when expiresAt is reached
attemptSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Attempt", attemptSchema);






// const mongoose = require("mongoose");

// const attemptSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   skill: { type: mongoose.Schema.Types.ObjectId, ref: "Skill", required: true },
//   level: {
//     type: String,
//     enum: ["beginner", "intermediate", "advanced"],
//     required: true,
//   },
//   questions: [
//     {
//       questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
//       selectedAnswer: { type: String, default: null },
//       isCorrect: { type: Boolean, default: false },
//     },
//   ],
//   submitted: { type: Boolean, default: false },
//   score: { type: Number, default: 0 },
//   correctAnswers: { type: Number, default: 0 },
//   totalQuestions: { type: Number, default: 0 },
//   weakTopics: [String],
//   youtubeVideoLinks: [
//     {
//       topic: { type: String },
//       links: [{ type: String }]
//     }
//   ],
//   takenAt: { type: Date, default: Date.now },
// }, { timestamps: true });

// module.exports = mongoose.model("Attempt", attemptSchema);
