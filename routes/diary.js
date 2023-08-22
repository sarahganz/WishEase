const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../config/ensureLoggedIn");
const diaryCtrl = require("../controllers/diary-controller");

// POST /api/diary
router.post("/", ensureLoggedIn, diaryCtrl.createDiaryEntry);

module.exports = router;
