const ListAnswers = require("../../../models/answers/answers.model");

module.exports.listanswers = async (req, res) => {
  try {
    const resultId = req.params.id;

    const getResults = await ListAnswers.findOne(
      { "results._id": resultId },
      { "results.$": 1 }
    );

    if (!getResults || !getResults.results || getResults.results.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy kết quả này!"
      });
    }

    return res.status(200).json({
      status: true,
      message: "Lấy dữ liệu thành công",
      data: getResults.results
    });

  } catch (error) {
    console.error("Lỗi listanswers:", error);
    return res.status(500).json({
      status: false,
      message: "Lỗi server, vui lòng thử lại!"
    });
  }
};
