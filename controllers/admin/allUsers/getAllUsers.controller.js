const Quiz = require("../../../models/getAllUsers/getAllUsers.model");

module.exports.getAllUsers = async (req, res) => {
  try {
    const quizDoc = await Quiz.findOne();

    if (!quizDoc || !quizDoc.users || quizDoc.users.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Không có dữ liệu người dùng",
      });
    }

    const usersList = quizDoc.users.map((u) => ({
      _id: u._id,
      fullName: u.fullName,
      email: u.email,
      phoneNumber: u.phoneNumber || null,
    }));

    return res.status(200).json({
      status: true,
      message: "Lấy danh sách người dùng thành công",
      data: usersList,
    });
  } catch (error) {
    console.error("Lỗi server:", error);
    return res.status(500).json({
      status: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};
