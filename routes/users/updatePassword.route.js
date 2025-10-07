// routes/client/updatePassword.js
const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/updatePassword/updatePassword.controller");

router.post("/", controller.changePassword);

module.exports = router;
