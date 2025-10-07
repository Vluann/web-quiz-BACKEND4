const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/fullName/getFullName.controller");

router.get("/", controller.getAllUsers);

module.exports = router;