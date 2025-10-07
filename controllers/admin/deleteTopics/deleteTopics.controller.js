// path: controllers/client/deleteTopics/deleteTopics.controller.js
const mongoose = require("mongoose");
const Quiz = require("../../../models/deleteTopics/deleteTopics.model");

module.exports.deleteTopic = async (req, res) => {
  try {
    const { topicId } = req.body;
    console.log("Topic ID nhận được từ FE:", topicId);

    if (!topicId) {
      return res.status(400).json({
        success: false,
        message: "Thiếu topicId!",
      });
    }

    const topicObjectId = new mongoose.Types.ObjectId(topicId);

    const quizDoc = await Quiz.findOne();
    if (!quizDoc)
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy document quiz!",
      });

    const topic = quizDoc.topics.id(topicObjectId);
    if (!topic)
      return res.status(404).json({
        success: false,
        message: "⚠️ Không tìm thấy topic cần xóa!",
      });

    quizDoc.topics = quizDoc.topics.filter(
      (t) => t._id.toString() !== topicObjectId.toString()
    );

    quizDoc.questions = quizDoc.questions.filter(
      (q) => q.topicId.toString() !== topicObjectId.toString()
    );

    quizDoc.markModified("topics");
    quizDoc.markModified("questions");

    await quizDoc.save();

    console.log("Đã xóa topic và các câu hỏi liên quan:", topicId);
    res.json({
      success: true,
    });
  } catch (error) {
    console.error("❌ Lỗi khi xóa topic:", error);
    res.status(500).json({
      success: false,
      message: "❌ Lỗi server khi xóa topic!",
      error: error.message,
    });
  }
};
