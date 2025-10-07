const mongoose = require("mongoose");
const { TopicSchema, QuestionSchema } = require("../editQuestions/editQuestion.model");

const QuizSchema = new mongoose.Schema(
  {
    topics: [TopicSchema],
    questions: [QuestionSchema],
    users: Array,
    answers: Array,
    feedBack: Array,
    results: Array,
    admin: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);
