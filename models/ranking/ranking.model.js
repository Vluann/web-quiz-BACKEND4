const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userId: { type: String, required: true },
  topicId: { type: Number, required: true },
  answers: [
    {
      questionId: Number,
      userAnswer: Number,
      correctAnswer: Number,
      isCorrect: Boolean,
    },
  ],
  completionTime: String,
  totalCorrect: Number,
  totalQuestions: Number,
  avgScore: Number,
  percentScore: Number,
});

const RankingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fullName: { type: String, default: "Ẩn danh" },
  totalQuiz: { type: Number, default: 0 },
  avgScore: { type: Number, default: 0 },
  bestScore: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
  topicId: { type: Number, default: null }, 
});

const QuizSchema = new mongoose.Schema({
  users: { type: Array, default: [] },
  topics: { type: Array, default: [] },
  questions: { type: Array, default: [] },
  answers: { type: Array, default: [] },
  feedBack: { type: Array, default: [] },
  results: { type: [ResultSchema], default: [] },
  ranking: { type: [RankingSchema], default: [] },
});

module.exports = mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema, "quiz");
