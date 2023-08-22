const Diary = require("../models/diary");

async function createDiaryEntry(req, res) {
  try {
    const { fromDate, toDate, restaurants, information, photos, destination } =
      req.body;
    const user = req.user;
    const newDiaryEntry = new Diary({
      fromDate,
      toDate,
      restaurants,
      information,
      photos,
      user: user._id,
      destination,
    });
    const savedDiaryEntry = await newDiaryEntry.save();
    res.status(201).json(savedDiaryEntry);
  } catch (error) {
    console.error("Error creating diary entry:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createDiaryEntry,
};
