const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  token: String,
  phoneNumber: String,
}, { _id: true });

const updateSchema = new mongoose.Schema({
  users: [userSchema],
  topics: Array,
  questions: Array,
  amswers: Array,
  feedBack: Array,
  results: Array,
}, { collection: "quiz" }); 

module.exports = mongoose.model("UpdateUser", updateSchema);
