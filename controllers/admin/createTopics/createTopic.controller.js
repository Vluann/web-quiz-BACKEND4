const createTopics = require("../../../models/createTopics/createTopics.model");

module.exports.createTopic = async (req, res) => {
  try {
    const { name, questions } = req.body;
    console.log("📥 Dữ liệu FE gửi lên:", req.body);

    if (!name || !questions || !Array.isArray(questions)) {
      return res.status(400).json({
        success: false,
        message: "❌ Thiếu dữ liệu topic hoặc câu hỏi!",
      });
    }

    const newTopicId = new createTopics()._id;
    const newTopic = { _id: newTopicId, name };

    const newQuestions = questions.map((q) => ({
      question: q.question,
      answers: typeof q.answers === "string" ? q.answers.split("|") : q.answers,
      correctAnswer: Number(q.correctAnswer),
      topicId: newTopicId,
    }));

    const result = await createTopics.updateOne(
      {},
      {
        $push: {
          topics: newTopic,
          questions: { $each: newQuestions },
        },
      },
      { upsert: true }
    );

    res.json({
      success: true,
      message: "Tạo topic + questions thành công!",
      data: {
        topic: newTopic,
        questions: newQuestions,
      },
      result,
    });
  } catch (error) {
    console.error("Lỗi khi tạo topic:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server!",
      error: error.message,
    });
  }
};
