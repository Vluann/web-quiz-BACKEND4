const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phoneNumber: String,
  token: String,
  password: String,
});

const allUSers = new mongoose.Schema(
  {
    users: [userSchema],
    topics: Array,
    questions: Array,
    answers: Array,
    feedBack: Array,
    results: Array,
    admin: Array,
  },
  { timestamps: true, collection: "quiz" }
);

const USers = mongoose.model("AllUsers", allUSers);
module.exports = USers;
