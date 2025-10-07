const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/topics/topics.controller");

router.get("", controller.getTopics);

module.exports = router;