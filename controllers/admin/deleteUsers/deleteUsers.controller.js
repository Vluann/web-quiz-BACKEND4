const mongoose = require("mongoose");
const Quiz = require("../../../models/deleteUSers/deleteUsers.model");

module.exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("User ID nhận được từ FE:", userId);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Thiếu userId!",
      });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const quizDoc = await Quiz.findOne();
    if (!quizDoc)
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy document quiz!",
      });

    const user = quizDoc.users.id(userObjectId);
    if (!user)
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy user cần xóa!",
      });

    quizDoc.users = quizDoc.users.filter(
      (u) => u._id.toString() !== userObjectId.toString()
    );

    quizDoc.markModified("users");
    await quizDoc.save();

    console.log("Đã xóa user ID:", userId);
    res.json({
      success: true,
      message: `Đã xóa user ID: ${userId}`,
    });
  } catch (error) {
    console.error("Lỗi khi xóa user:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi xóa user!",
      error: error.message,
    });
  }
};
