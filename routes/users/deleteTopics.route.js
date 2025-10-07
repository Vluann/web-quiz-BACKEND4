const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/deleteTopics/deleteTopics.controller");
router.post("/", controller.deleteTopic);

module.exports = router;