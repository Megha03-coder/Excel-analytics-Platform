const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema(
  {
    userId: String,
    fileName: String,
    parsedData: Array,
  },
  { timestamps: true } // ✅ this adds createdAt and updatedAt
);

module.exports = mongoose.model("Upload", uploadSchema);
