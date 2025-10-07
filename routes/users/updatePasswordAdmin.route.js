const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/updatePasswordAdmin/updatePassword.controller");

router.post("/", controller.changePasswordAdmin);

module.exports = router;
