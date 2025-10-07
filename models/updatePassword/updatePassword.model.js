// models/quiz.model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String },
  phoneNumber: { type: String, default: null }
}, { timestamps: true });

const quizSchema = new mongoose.Schema({
  users: [userSchema],
  topics: { type: Array, default: [] },
  questions: { type: Array, default: [] },
  answers: { type: Array, default: [] },
  feedBack: { type: Array, default: [] },
  results: { type: Array, default: [] }
}, { collection: "quiz" });

module.exports = mongoose.models.QuizData || mongoose.model("QuizData", quizSchema);
