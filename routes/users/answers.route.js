const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/answers/answers.controller");
router.post("/", controller.createresults);
module.exports = router;