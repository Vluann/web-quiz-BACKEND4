const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/users/users.controller");
router.post("/", controller.getUserAdmin);

module.exports = router;