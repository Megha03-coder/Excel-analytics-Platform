const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx"); // ✅ FIXED
const Upload = require("../models/Upload");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("file"), async (req, res) => {
    console.log("📥 Received file:", req.file);        // Check if multer received the file
  console.log("👤 Received userId:", req.body.userId); // Confirm userId is present

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" }); // Early exit if file is missing
  }
  try {
    const { userId } = req.body;

    // ✅ Read buffer using xlsx
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    const newUpload = new Upload({
      userId,
      fileName: req.file.originalname,
      parsedData: data,
    });

    await newUpload.save();
    res.status(200).json({ message: "Upload successful" });
  } catch (err) {
    console.error("❌ Upload error:", err); // ✅ Debugging
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const uploads = await Upload.find({ userId: req.params.userId });
    res.status(200).json(uploads);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch uploads" });
  }
});

module.exports = router;
