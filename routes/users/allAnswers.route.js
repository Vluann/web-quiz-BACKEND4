const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/allAnswers/allAnswers.controller");

router.get("/", controller.getAllAnswers);

module.exports = router;