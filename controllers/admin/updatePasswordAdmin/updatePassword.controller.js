const mongoose = require("mongoose");
const UpdateAdmin = require("../../../models/updatePasswordAdmin/updatePassword.model");

module.exports.changePasswordAdmin = async (req, res) => {
  try {
    const adminId = req.query._id?.trim();
    const { passwordOld, passwordNew, passwordNewAgain } = req.body;

    if (!adminId || !passwordOld || !passwordNew || !passwordNewAgain) {
      return res.status(400).json({
        status: false,
        message: "thiếu dữ liệu cần thiết",
      });
    }

    if (passwordNew !== passwordNewAgain) {
      return res.status(400).json({
        status: false,
        message: "Mật khẩu xác nhận không khớp",
      });
    }

    const objectId = new mongoose.Types.ObjectId(adminId);

    const doc = await UpdateAdmin.findOne({ "admin._id": objectId });
    if (!doc) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy admin để đổi mật khẩu",
      });
    }

    const admin = doc.admin.find(a => a._id.toString() === adminId);
    if (!admin) {
      return res.status(404).json({
        status: false,
        message: "Admin không tồn tại",
      });
    }

    if (admin.password !== passwordOld) {
      return res.status(401).json({
        status: false,
        message: "Mật khẩu hiện tại không đúng",
      });
    }

    const updatedDoc = await UpdateAdmin.findOneAndUpdate(
      { "admin._id": objectId },
      {
        $set: {
          "admin.$[elem].password": passwordNew,
        },
      },
      {
        new: true,
        arrayFilters: [{ "elem._id": objectId }],
      }
    );

    const updatedAdmin = updatedDoc.admin.find(a => a._id.toString() === adminId);

    console.log("Đổi mật khẩu thành công:", updatedAdmin);

    return res.status(200).json({
      status: true,
      message: "Đổi mật khẩu thành công",
      data: { _id: updatedAdmin._id, email: updatedAdmin.email },
    });

  } catch (error) {
    console.error("Lỗi đổi mật khẩu admin:", error);
    return res.status(500).json({
      status: false,
      message: "Lỗi server, vui lòng thử lại",
      error: error.message,
    });
  }
};
