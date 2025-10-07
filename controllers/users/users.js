const Quiz = require("../../models/users/users.model");

module.exports.user = async (req, res) => {
  try {
    const { email, password } = req.body; 

    const userItem = await Quiz.findOne(
      {
        users: { $elemMatch: { email: email, password: password } }
      },
      { "users.$": 1 }
    );


    if (!userItem || !userItem.users || userItem.users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Sai email hoặc mật khẩu",
      });
    }

    const user = userItem.users[0];
    return res.json({
      success: true,
      users: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        token: user.token
      },
    });

  } catch (error) {
    console.error("Lỗi Mongo:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi, vui lòng đăng nhập lại",
    });
  }
};
