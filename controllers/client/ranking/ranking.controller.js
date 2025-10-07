const Quiz = require("../../../models/ranking/ranking.model");

module.exports.getRanking = async (req, res) => {
  try {
    const quizDoc = await Quiz.findOne();
    if (!quizDoc) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy dữ liệu quiz",
      });
    }

    if (!quizDoc.results || quizDoc.results.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Không có dữ liệu kết quả",
      });
    }

    const results = quizDoc.results.map(r => ({
      userId: String(r.userId),
      topicId: Number(r.topicId),
      percentScore: Number(r.percentScore || 0),
    }));

    const userScores = {};

    results.forEach(r => {
      if (!userScores[r.userId]) {
        userScores[r.userId] = {
          userId: r.userId,
          fullName: "Ẩn danh", 
          totalQuiz: 0,
          totalScore: 0,
          bestScore: 0,
          sumAvg: 0,
          avgScore: 0,
          topicId: null,
        };
      }

      const score = r.percentScore;
      userScores[r.userId].totalQuiz += 1;
      userScores[r.userId].totalScore += score;
      userScores[r.userId].bestScore = Math.max(userScores[r.userId].bestScore, score);
      userScores[r.userId].sumAvg += score;
    });

    Object.values(userScores).forEach(u => {
      u.avgScore = Number((u.sumAvg / u.totalQuiz).toFixed(2));
      delete u.sumAvg;
    });

    const ranking = Object.values(userScores).sort((a, b) => b.totalScore - a.totalScore);

  
    if (!quizDoc.ranking) quizDoc.ranking = [];

    quizDoc.ranking = quizDoc.ranking.filter(r => r.topicId !== null);

    const rankingToSave = ranking.map(u => ({
      userId: String(u.userId),
      fullName: u.fullName || "Ẩn danh",
      totalQuiz: Number(u.totalQuiz),
      avgScore: Number(u.avgScore),
      bestScore: Number(u.bestScore),
      totalScore: Number(u.totalScore),
      topicId: null,
    }));

    quizDoc.ranking.push(...rankingToSave);

    await quizDoc.save();

    return res.status(200).json({
      status: true,
      message: "Lấy ranking tổng hợp thành công",
      data: rankingToSave,
    });
  } catch (err) {
    console.error("Lỗi lấy ranking:", err);
    return res.status(500).json({
      status: false,
      message: "Lỗi server",
      error: err.message,
    });
  }
};
