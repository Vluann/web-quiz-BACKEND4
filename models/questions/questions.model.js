const mongoose = require("mongoose");

const QuestionItemSchema = new mongoose.Schema({
  id: Number, 
  topicId: mongoose.Schema.Types.ObjectId, 
  question: String,
  answers: [String],
  correctAnswer: Number
});

const QuestionSchema = new mongoose.Schema({
  questions: [QuestionItemSchema]
}, { timestamps: true });

module.exports = mongoose.model("Question", QuestionSchema, "quiz");
