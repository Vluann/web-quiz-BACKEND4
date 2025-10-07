const userAdmins = require("../../../models/userAdmin/userAdmin.model");

module.exports.getUserAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("FE Gửi Lên: ", email, password);

 
    const userItem = await userAdmins.findOne(
      {
        "admin.email": email,
        "admin.password": password,
      },
      { "admin.$": 1 } 
    );


    if (!userItem || !userItem.admin || userItem.admin.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Sai email hoặc mật khẩu",
      });
    }

    const user = userItem.admin[0];
    return res.json({
      success: true,
      users: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        token: user.token,
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
