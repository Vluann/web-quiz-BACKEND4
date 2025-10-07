const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/questions/questions.controller");

router.get("/:id", controller.getlistQuestions);

module.exports = router;