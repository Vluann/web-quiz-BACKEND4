const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topics",
    required: true
  },
  question: String,
  answers: [String],
  correctAnswer: Number
});

const quizSchema = new mongoose.Schema({
  questions: [questionSchema]
});

const Question = mongoose.model("Questions", quizSchema, "quiz");

module.exports = Question;
