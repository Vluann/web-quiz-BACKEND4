const AllAnswers = require("../../../models/allAnswers/getAllAnswers.model");

module.exports.getAllAnswers = async (req, res) => {
  try {
    const allResultsDocs = await AllAnswers.find({}, { results: 1, _id: 0 });

    if (!allResultsDocs || allResultsDocs.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Không có dữ liệu results!"
      });
    }

    // Gộp tất cả mảng results từ từng document thành 1 mảng duy nhất
    const allResults = allResultsDocs.flatMap(doc => doc.results);

    return res.status(200).json({
      status: true,
      message: "Lấy dữ liệu thành công",
      data: allResults
    });

  } catch (error) {
    console.error("Lỗi listAllAnswers:", error);
    return res.status(500).json({
      status: false,
      message: "Lỗi server, vui lòng thử lại!"
    });
  }
};
