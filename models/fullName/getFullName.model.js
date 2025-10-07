const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // id tự động
  fullName: { type: String, required: true },
});

const QuizSchema = new mongoose.Schema({
  users: { type: [UserSchema], default: [] },
});

const getFullName = mongoose.model("getFullName", QuizSchema, "quiz");

module.exports = getFullName;
