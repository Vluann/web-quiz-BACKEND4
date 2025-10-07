const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/deleteUsers/deleteUsers.controller");
router.post("/", controller.deleteUser);

module.exports = router;