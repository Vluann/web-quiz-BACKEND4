const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/editQuestions/editQuestions.controller");
router.post("/", controller.editques);

module.exports = router;