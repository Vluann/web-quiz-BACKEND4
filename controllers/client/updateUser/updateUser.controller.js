const mongoose = require("mongoose");
const UpdateUser = require("../../../models/updateUser/updateUser.model");

module.exports.updateUser = async (req, res) => {
  try {
    const userId = req.query._id?.trim();
    const { fullName, email, phone } = req.body;

    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "Thiếu ID người dùng cần cập nhật",
      });
    }

    const updatedDoc = await UpdateUser.findOneAndUpdate(
      { "users._id": userId },
      {
        $set: {
          "users.$[elem].fullName": fullName,
          "users.$[elem].email": email,
          "users.$[elem].phoneNumber": phone || null,
        },
      },
      {
        new: true,
        arrayFilters: [
          { "elem._id": new mongoose.Types.ObjectId(userId) }, 
        ],
      }
    );

    if (!updatedDoc) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy người dùng để cập nhật",
      });
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
    console.error("Lỗi cập nhật:", error);
    return res.status(500).json({
      status: false,
      message: "Lỗi server, vui lòng thử lại",
      error: error.message,
    });
  }
};
