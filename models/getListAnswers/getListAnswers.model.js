const mongoose = require("mongoose");

const getListAnswers = new mongoose.Schema({

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

const getListAnswersSchema = new mongoose.Schema({
    results: [getListAnswers]
})

module.exports = mongoose.model("ListAnswers", getListAnswersSchema, "quiz");