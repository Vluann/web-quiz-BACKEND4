const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/allUsers/getAllUsers.controller");
router.get("/", controller.getAllUsers);

module.exports = router;