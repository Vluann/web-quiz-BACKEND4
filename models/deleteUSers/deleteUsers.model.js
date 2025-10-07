const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: false },
    email: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    password: { type: String, required: false },
  },
  { timestamps: true }
);

const deleteUsersSchema = new mongoose.Schema(
  {
    users: [UserSchema],
    topics: { type: Array, default: [] },
    questions: { type: Array, default: [] },
    results: { type: Array, default: [] },
    feedBack: { type: Array, default: [] },
    admin: { type: Array, default: [] },
  },
  { collection: "quiz", timestamps: true }
);

module.exports = mongoose.model("DelUsers", deleteUsersSchema);
