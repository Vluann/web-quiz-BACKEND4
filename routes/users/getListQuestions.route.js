const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/getListQuestions/getListQuestions.controller");

router.get("/", controller.getlistQuestions);

module.exports = router;