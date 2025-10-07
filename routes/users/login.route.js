const express = require("express");
const router = express.Router();

const controller = require("../../controllers/users/users");

router.post("/", controller.user);

module.exports = router;