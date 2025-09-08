const mongoose = require("mongoose");

const spareSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
});

const Spare = mongoose.model("Spare", spareSchema);

module.exports = Spare;
