const mongoose = require("mongoose");
const Questions = require("../../../models/questions/questions.model");

module.exports.getlistQuestions = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "TopicId không hợp lệ!" });
    }

    let objectId;
    if (mongoose.Types.ObjectId.isValid(id)) {
      objectId = new mongoose.Types.ObjectId(id);
    }

    const doc = await Questions.findOne({}, { questions: 1, _id: 0 });
    if (!doc) return res.json([]);

    const filterQuestions = doc.questions.filter(q => {
      if (typeof q.topicId === "number") {
        return q.topicId === parseInt(id);
      } 
      else if (mongoose.Types.ObjectId.isValid(q.topicId)) {
        return q.topicId.toString() === (objectId ? objectId.toString() : id.toString());
      }
      return false;
    });

    return res.json(filterQuestions);
  } catch (error) {
    console.error("Lỗi getlistQuestions:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
