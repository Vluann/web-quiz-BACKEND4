const { generateToken } = require("../../../helper/token");
const Quiz = require("../../../models/users/users.model");
const mongoose = require("mongoose"); 
module.exports.register = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber } = req.body;

    const userItem = await Quiz.findOne(
      { "users.email": email },
      { "users.$": 1 }
    );

    if (userItem && userItem.users && userItem.users.length > 0) {
      return res.status(400).json({
        success: false,
        type: "EMAIL_EXISTED",
        message: "Email đã tồn tại, vui lòng chọn email khác!",
      });
    }

    const newUser = {
      _id: new mongoose.Types.ObjectId(),
      fullName,
      email,
      password,
      phoneNumber: phoneNumber || null,
      token: generateToken(),
    };

    await Quiz.updateOne({}, { $push: { users: newUser } });

    return res.status(201).json({
      success: true,
      type: "REGISTER_SUCCESS",
      message: "Đăng ký thành công!",
      user: newUser,
    });
  } catch (error) {
    console.log("Lỗi Mongoose:", error);
    return res.status(500).json({
      success: false,
      type: "SERVER_ERROR",
      message: "Lỗi server, vui lòng thử lại sau!",
    });
  }
};
