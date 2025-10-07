const Questions = require("../../../models/quiz/quiz.model");

module.exports.getCountTopics = async (req, res) => {
  try {
    const quizDoc = await Questions.findOne({}, { questions: 1, _id: 0 });

    if (!quizDoc || !quizDoc.questions) {
      return res.json([]);
    }

    const counts = quizDoc.questions.reduce((sum, q) => {
      const key = q.topicId ? q.topicId.toString() : "undefined";
      sum[`topicId_${key}`] = (sum[`topicId_${key}`] || 0) + 1;
      return sum;
    }, {});

    return res.json([counts]);
  } catch (error) {
    console.error("Lỗi Mongoose:", error);
    return res.status(500).json({
      status: false,
      message: "Lỗi Server Khi Lấy Danh Sách Câu Hỏi!!!",
    });
  }
};
