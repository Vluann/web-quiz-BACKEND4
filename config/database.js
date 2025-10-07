const mongoose = require("mongoose");
module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ MongoDB Connected!");
        console.log("📡 Đang kết nối tới:", process.env.MONGO_URL);
    } catch (error) {
        console.log("Connection Error");
    }
}