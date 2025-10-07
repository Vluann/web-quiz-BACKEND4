const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/updateUser/updateUser.controller");

router.post("/", controller.updateUser);

module.exports = router;
