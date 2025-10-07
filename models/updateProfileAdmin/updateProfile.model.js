const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  token: String,
  phoneNumber: String,
}, { _id: true });

const updateAdminSchema = new mongoose.Schema({
  users: Array,
  topics: Array,
  questions: Array,
  amswers: Array,
  feedBack: Array,
  results: Array,
  admin: [adminSchema],
}, { collection: "quiz" });

module.exports = mongoose.model("UpdateAdmin", updateAdminSchema);
