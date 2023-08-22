const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../config/ensureLoggedIn");
const diaryCtrl = require("../controllers/diary-controller");

// GET /api/diary?destination=:destinationId
router.get("/", ensureLoggedIn, diaryCtrl.getDiaryEntries);

// POST /api/diary
router.post("/", ensureLoggedIn, diaryCtrl.createDiaryEntry);

module.exports = router;
