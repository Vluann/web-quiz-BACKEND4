const mongoose = require("mongoose");

const getAllAnswers = new mongoose.Schema({

    _id: String,
    userId: String,
    topicId: String,
    answers: [
        {
            name: Number,
            value: Number,
            _id: String
        }
    ],
    completionTime: String,
    totalCorrect: Number,
    totalQuestions: Number,
    avgScore: Number,
    percentScore: Number,
    detail: [
        {
            questionId: Number,
            userAnswer: Number,
            correctAnswer: Number,
            isCorrect: Boolean
        }

    ]
});

const getAllAnswer = new mongoose.Schema({
    results: [getAllAnswers]
})

module.exports = mongoose.model("AllAnswers", getAllAnswer, "quiz");