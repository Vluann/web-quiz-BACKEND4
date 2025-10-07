const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/quiz/quiz.controller");

router.get("/", controller.getCountTopics);

module.exports = router;