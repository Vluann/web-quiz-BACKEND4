const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema(
  { name: { type: String, required: true } },
  { timestamps: true }
);

const QuestionSchema = new mongoose.Schema(
  {
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
    question: { type: String, required: true },
    answers: { type: [String], required: true },
    correctAnswer: { type: Number, required: true }
  },
  { timestamps: true }
);

const quizzzSchema = new mongoose.Schema(
  {
    topics: [TopicSchema],
    questions: [QuestionSchema],
    users: { type: Array, default: [] },
    results: { type: Array, default: [] },
    feedBack: { type: Array, default: [] },
    admin: { type: Array, default: [] }
  },
  { collection: "quiz", timestamps: true } // collection = quiz
);

module.exports = mongoose.model("Quizzzz", quizzzSchema);
