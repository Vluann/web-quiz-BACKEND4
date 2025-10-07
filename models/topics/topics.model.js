const mongoose = require("mongoose");

const topicSchema = mongoose.Schema({
    id: String,
    name: String
});

const quizSchema = new mongoose.Schema({
    topics: [topicSchema]
});

const Topic = mongoose.model("Topics", quizSchema, "quiz");

module.exports = Topic;