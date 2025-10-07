const Topic = require("../../../models/topics/topics.model");

module.exports.getTopics = async (req, res) => {
    try {
        const topics = await Topic.findOne({}, {
            topics: 1,
            _id: false
        });

       res.json(topics?.topics || []);
    } catch (error) {
        console.log("Lỗi Mongoose:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi Server Khi Lấy Danh Sách Topics"
        });
    }
};