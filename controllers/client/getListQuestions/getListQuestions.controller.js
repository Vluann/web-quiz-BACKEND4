const Questions = require("../../../models/quiz/quiz.model");

module.exports.getlistQuestions = async (req,res) => {
    try {
        const questions = await Questions.findOne({}, {
            questions: 1,
             _id: 0
        });
       
        return res.json(questions)
    } catch (error) {
        console.log("Lỗi Mongoose!!!", error);
        res.status(500).json({
           status: false,
           message: "Lỗi Server, Lấy Dữ Liệu Không Thành Công!!!",
        })
    }
}