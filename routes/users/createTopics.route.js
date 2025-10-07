const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/createTopics/createTopic.controller");

router.post("/", controller.createTopic);

module.exports = router;
