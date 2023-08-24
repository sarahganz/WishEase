const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../config/ensureLoggedIn");
const diaryCtrl = require("../controllers/diary-controller");
const { uploadImage } = require("../middleware/upload2");

// GET /api/diary?destination=:destinationId
router.get("/", ensureLoggedIn, diaryCtrl.getDiaryEntries);

// POST /api/diary
router.post(
  "/",
  ensureLoggedIn,
  uploadImage.array("photos"),
  diaryCtrl.createDiaryEntry
);

// Delete a diary entry by ID
router.delete("/:id", ensureLoggedIn, diaryCtrl.deleteDiaryEntry);

module.exports = router;
