const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/getListAnswers/getListAnswers.controller");

router.get("/:id", controller.listanswers);

module.exports = router;