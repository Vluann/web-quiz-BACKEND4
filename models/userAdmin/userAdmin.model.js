const mongoose = require("mongoose");
const userAdmin = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    token: String,
    phoneNumber: String,
    _id: mongoose.Schema.Types.ObjectId,
  },
  { _id: false }
);

const adminSchema = new mongoose.Schema({
  admin: [userAdmin],
});

const adminUsers = mongoose.model("UserAdmins", adminSchema, "quiz");
module.exports = adminUsers;
