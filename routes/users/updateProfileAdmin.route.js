const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/updateProfileAdmin/updateProfile.controller");

router.post("/", controller.updateAdmin);

module.exports = router;
