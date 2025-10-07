const mongoose = require("mongoose");

// Schema từng câu trả lời người dùng
const AnswerItemSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.ObjectId, ref: "Questions" }, 
  value: { type: Number, required: true } 
});

const ResultDetailSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Questions" },
  userAnswer: { type: Number },
  correctAnswer: { type: Number },
  isCorrect: { type: Boolean }
});

const ResultSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
  answers: [AnswerItemSchema],
  completionTime: { type: String },
  totalCorrect: Number,
  totalQuestions: Number,
  avgScore: Number,
  percentScore: Number,
  detail: [ResultDetailSchema]
});

const CreateSchema = new mongoose.Schema({
  results: [ResultSchema]
}, { timestamps: true });

module.exports = mongoose.model("CreateResults", CreateSchema, "quiz");
