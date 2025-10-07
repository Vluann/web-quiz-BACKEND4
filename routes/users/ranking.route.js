const express = require("express");
const router = express.Router();

const rankingController = require("../../controllers/client/ranking/ranking.controller");

router.get("/", rankingController.getRanking);


module.exports = router;
