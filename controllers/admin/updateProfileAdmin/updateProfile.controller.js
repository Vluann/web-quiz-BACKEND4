const mongoose = require("mongoose");
const UpdateAdmin = require("../../../models/updateProfileAdmin/updateProfile.model");

module.exports.updateAdmin = async (req, res) => {
  try {
    const adminId = req.query._id?.trim();
    const { fullName, email, phone, password } = req.body;

    console.log("Dữ liệu FE gửi lên:", req.body);
    console.log("ID admin:", adminId);

    if (!adminId) {
      return res.status(400).json({
        status: false,
        message: "Thiếu ID admin cần cập nhật",
      });
    }

    const objectId = new mongoose.Types.ObjectId(adminId);

    const updatedDoc = await UpdateAdmin.findOneAndUpdate(
      { "admin._id": objectId },
      {
        $set: {
          "admin.$[elem].fullName": fullName,
          "admin.$[elem].email": email,
          "admin.$[elem].phoneNumber": phone || null,
          ...(password ? { "admin.$[elem].password": password } : {}),
        },
      },
      {
        new: true, 
        arrayFilters: [{ "elem._id": objectId }],
      }
    );

    if (!updatedDoc) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy admin để cập nhật",
      });
    }

    const updatedAdmin = updatedDoc.admin.find(
      (a) => a._id.toString() === adminId
    );

    console.log("✅ Admin sau khi cập nhật:", updatedAdmin);

    return res.status(200).json({
      status: true,
      message: "Cập nhật thông tin admin thành công",
      data: updatedAdmin,
    });
  } catch (error) {
    console.error("Lỗi cập nhật admin:", error);
    return res.status(500).json({
      status: false,
      message: "Lỗi server, vui lòng thử lại",
      error: error.message,
    });
  }
};
