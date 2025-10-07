const mongoose = require("mongoose");

// Topic schema
const TopicSchema = new mongoose.Schema({
  name: { type: String, required: true },
}, { timestamps: true });

const QuestionSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" }, 
  question: { type: String, required: true },
  answers: { type: [String], required: true },
  correctAnswer: { type: Number, required: true },
}, { timestamps: true });

const CreateTopicsSchema = new mongoose.Schema({
  topics: [TopicSchema],
  questions: [QuestionSchema],
});

const createTopics = mongoose.model("createTopics", CreateTopicsSchema, "quiz");
module.exports = createTopics;
