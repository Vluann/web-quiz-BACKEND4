const mongoose = require("mongoose");
const Quiz = require("../../../models/editQuestions/editQuestion.model");

module.exports.editques = async (req, res) => {
  try {
    const { topicId, newTopicName, updatedQuestions } = req.body;

    if (!topicId || !newTopicName || !Array.isArray(updatedQuestions)) {
      return res
        .status(400)
        .json({ status: false, message: "Thiếu dữ liệu từ FE" });
    }

    const topicObjectId = new mongoose.Types.ObjectId(topicId);

    const quizDoc = await Quiz.findOne();
    if (!quizDoc)
      return res
        .status(404)
        .json({ status: false, message: "Không tìm thấy document quiz" });

    const topic = quizDoc.topics.id(topicObjectId);
    if (!topic)
      return res
        .status(404)
        .json({
          status: false,
          message: "Không tìm thấy topic để cập nhật",
        });

    topic.name = newTopicName;
    topic.updatedAt = new Date();

    quizDoc.questions = quizDoc.questions.filter(
      (q) => q.topicId && q.topicId.toString() !== topicObjectId.toString()
    );

    const newQuestions = updatedQuestions.map((q) => ({
      topicId: topicObjectId,
      question: q.question,
      answers: q.answers,
      correctAnswer: q.correctAnswer,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    quizDoc.questions.push(...newQuestions);

    quizDoc.markModified("topics");
    quizDoc.markModified("questions");

    await quizDoc.save();

    return res.status(200).json({
      status: true,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật:", error);
    return res
      .status(500)
      .json({ status: false, message: "Lỗi server", error: error.message });
  }
};
