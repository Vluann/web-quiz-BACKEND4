const AnswersByUser = require("../../../models/getListAnswers/getListAnswers.model");

module.exports.getAnswersById = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log("📥 userId:", userId);

        const allDocs = await AnswersByUser.find();

        const doc = allDocs.find(d => 
            d.results.some(r => r.userId === userId)
        );

        if (!doc) {
            return res.status(404).json({
                status: false,
                message: "Không tìm thấy kết quả của người dùng này",
            });
        }

        const filteredResults = doc.results.filter(r => r.userId === userId);

        return res.status(200).json({
            status: true,
            message: "✅ Lấy dữ liệu thành công",
            responseData: {
                results: filteredResults,
            },
        });

    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        return res.status(500).json({
            status: false,
            message: "Lỗi server, không thể lấy dữ liệu",
        });
    }
};
