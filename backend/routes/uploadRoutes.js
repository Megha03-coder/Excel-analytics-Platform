// backend/routes/uploadRoutes.js
const express = require("express");
const multer = require("multer");
const XLSX = require("xlsx");
const Upload = require("../models/Upload");

const router = express.Router();

// Store file in memory (no disk)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const buffer = req.file.buffer;
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const uploadRecord = new Upload({
      userId: req.body.userId,
      fileName: req.file.originalname,
      parsedData: jsonData,
    });

    await uploadRecord.save();
    res.status(200).json({ message: "File uploaded and parsed", data: uploadRecord });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

// backend/routes/uploadRoutes.js

router.get("/user/:userId", async (req, res) => {
  try {
    const uploads = await Upload.find({ userId: req.params.userId });
    res.status(200).json(uploads);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch uploads" });
  }
});


module.exports = router;
