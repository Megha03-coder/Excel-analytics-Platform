// backend/models/Upload.js
const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fileName: String,
  uploadDate: { type: Date, default: Date.now },
  parsedData: [{}], // array of row objects
});

module.exports = mongoose.model("Upload", uploadSchema);
