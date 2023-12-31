const Diary = require("../models/diary");

async function createDiaryEntry(req, res) {
  try {
    const { fromDate, toDate, restaurants, information, destination } =
      req.body;
    const user = req.user;
    const photoUrls = req.files.map((file) => file.location);
    const newDiaryEntry = new Diary({
      fromDate,
      toDate,
      restaurants,
      information,
      photos: photoUrls,
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

async function getDiaryEntries(req, res) {
  try {
    const { destination } = req.query;
    const diaryEntries = await Diary.find({ destination }).exec();
    const diaryEntriesWithImages = diaryEntries.map((entry) => ({
      ...entry.toObject(),
      photos: entry.photos.map((photoUrl) => ({
        url: photoUrl,
      })),
    }));
    res.status(200).json(diaryEntries);
  } catch (error) {
    console.error("Error fetching diary entries:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteDiaryEntry(req, res) {
  try {
    const entryId = req.params.id;
    await Diary.findByIdAndDelete(entryId);

    res.status(200).json({ success: true, message: "Diary entry deleted" });
  } catch (error) {
    console.error("Error deleting diary entry:", error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting diary entry" });
  }
}

module.exports = {
  createDiaryEntry,
  getDiaryEntries,
  deleteDiaryEntry,
};
