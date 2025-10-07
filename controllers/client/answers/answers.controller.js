const mongoose = require("mongoose");
const CreateResults = require("../../../models/answers/answers.model");
const Questions = require("../../../models/questions/questions.model");

module.exports.createresults = async (req, res) => {
  try {
    const { userId, topicId, answers, completionTime } = req.body;

    if (!mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({ status: false, message: "TopicId không hợp lệ!" });
    }
    const topicObjectId = new mongoose.Types.ObjectId(topicId);

    const topicQuestionsDocs = await Questions.find({ "questions.topicId": topicObjectId });
    if (!topicQuestionsDocs || topicQuestionsDocs.length === 0) {
      return res.status(404).json({ status: false, message: "Không tìm thấy câu hỏi cho topic này!" });
    }

    let questionsArr = [];
    topicQuestionsDocs.forEach(doc => {
      if (doc.questions && doc.questions.length > 0) {
        questionsArr = questionsArr.concat(
          doc.questions.filter(q => q.topicId && q.topicId.toString() === topicId)
        );
      }
    });

    if (questionsArr.length === 0) {
      return res.status(404).json({ status: false, message: "Topic này chưa có câu hỏi!" });
    }

    const correctAnswers = answers.map(item => {
      const question = questionsArr.find(q => q._id.toString() === item.name.toString());
      return {
        questionId: item.name,
        userAnswer: item.value,
        isCorrect: question ? question.correctAnswer === item.value : false,
        correctAnswer: question ? question.correctAnswer : null
      };
    });

    const totalCorrect = correctAnswers.filter(c => c.isCorrect).length;
    const totalQuestions = correctAnswers.length;
    const avgScore = parseFloat(((totalCorrect / totalQuestions) * 10).toFixed(2));
    const percentScore = parseFloat(((totalCorrect / totalQuestions) * 100).toFixed(2));

    const newResult = {
      _id: new mongoose.Types.ObjectId(),
      userId,
      topicId: topicObjectId,
      answers,
      completionTime,
      totalCorrect,
      totalQuestions,
      avgScore,
      percentScore,
      detail: correctAnswers
    };

    await CreateResults.updateOne(
      {},
      { $push: { results: newResult } },
      { upsert: true }
    );

    return res.status(200).json({
      status: true,
      message: "Lưu kết quả thành công",
      data: newResult
    });

  } catch (error) {
    console.error("Lỗi Mongoose:", error);
    return res.status(500).json({ status: false, message: "Lỗi server, vui lòng thử lại." });
  }
};
