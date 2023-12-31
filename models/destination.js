const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  country: { type: String, required: true },
  city: { type: String, required: true },
});

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;
