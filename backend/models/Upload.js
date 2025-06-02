const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fileName: { type: String, required: true },
  parsedData: { type: Array, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Upload", uploadSchema);
