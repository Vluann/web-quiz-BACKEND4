const mongoose = require("mongoose");
const QuizData = require("../../../models/updatePassword/updatePassword.model");

module.exports.updateUser = async (req, res) => {
  try {
    const userId = req.query._id?.trim();
    const { fullName, email, phoneNumber, passwordOld } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ status: false, message: "Thiếu ID người dùng" });
    }

    if (passwordOld !== undefined) {
      return await module.exports.changePassword(req, res);
    }

    const updatedDoc = await QuizData.findOneAndUpdate(
      { "users._id": userId },
      {
        $set: {
          "users.$[elem].fullName": fullName,
          "users.$[elem].email": email,
          "users.$[elem].phoneNumber": phoneNumber || null,
        },
      },
      {
        new: true,
        arrayFilters: [{ "elem._id": new mongoose.Types.ObjectId(userId) }],
      }
    );

    if (!updatedDoc) {
      return res
        .status(404)
        .json({ status: false, message: " Không tìm thấy người dùng" });
    }

    const updatedUser = updatedDoc.users.find(
      (u) => u._id.toString() === userId
    );

    return res.status(200).json({
      status: true,
      message: "Cập nhật thông tin thành công",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Lỗi updateUser:", error);
    return res
      .status(500)
      .json({ status: false, message: "Lỗi server", error: error.message });
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    const userId = req.query._id?.trim();
    const { passwordOld, passwordNew, passwordNewAgain } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ status: false, message: "Thiếu ID người dùng" });
    }

    if (!passwordOld || !passwordNew || !passwordNewAgain) {
      return res
        .status(400)
        .json({ status: false, message: "Thiếu dữ liệu đầu vào" });
    }

    const doc = await QuizData.findOne({ "users._id": userId });
    if (!doc) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy document chứa user",
      });
    }

    const user = doc.users.find((u) => u._id.toString() === userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "Không tìm thấy user trong mảng" });
    }

    if (user.password !== passwordOld) {
      return res
        .status(400)
        .json({ status: false, message: "Mật khẩu cũ không đúng" });
    }

    if (passwordNew !== passwordNewAgain) {
      return res.status(400).json({
        status: false,
        message: "Mật khẩu mới và xác nhận không khớp",
      });
    }

    await QuizData.findOneAndUpdate(
      { "users._id": userId },
      { $set: { "users.$[elem].password": passwordNew } },
      {
        new: true,
        arrayFilters: [{ "elem._id": new mongoose.Types.ObjectId(userId) }],
      }
    );

    return res
      .status(200)
      .json({ status: true, message: "Đổi mật khẩu thành công" });
  } catch (error) {
    console.error("Lỗi changePassword:", error);
    return res
      .status(500)
      .json({ status: false, message: "Lỗi server", error: error.message });
  }
};
