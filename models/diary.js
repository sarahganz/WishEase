const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diarySchema = new Schema({
  fromDate: { type: Date },
  toDate: { type: Date },
  restaurants: { type: String },
  information: { type: String },
  photos: [{ type: String }], // Array of image paths
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
    required: true,
  },
});

const Diary = mongoose.model("Diary", diarySchema);

module.exports = Diary;
