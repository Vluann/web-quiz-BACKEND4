const getFullName = require("../../../models/fullName/getFullName.model");

module.exports.getAllUsers = async (req, res) => {
  try {
    const quizDoc = await getFullName.findOne({}, { users: 1, _id: 0 });

    if (!quizDoc || !quizDoc.users || quizDoc.users.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy dữ liệu người dùng",
      });
    }

    const usersList = quizDoc.users.map(u => ({
      _id: u._id,
      fullName: u.fullName
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
