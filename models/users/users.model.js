const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  token: String,
  phoneNumber: String
});

const quizSchema = new mongoose.Schema({
  users: [userSchema]
});

const Quiz = mongoose.model("Quiz", quizSchema, "quiz");

module.exports = Quiz;
