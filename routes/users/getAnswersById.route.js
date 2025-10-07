const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/getAnswersByUser/getanswerByUser.controller");
router.get("/:id", controller.getAnswersById);

module.exports = router;