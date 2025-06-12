const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const authMiddleware = require("../middleware/authMiddleware");
const ExcelUpload = require("../models/ExcelUpload");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const newUpload = new ExcelUpload({
      user: req.user.id,
      filename: req.file.originalname,
      data,
    });

    await newUpload.save();

    res.json({ message: "Excel uploaded and saved to database", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error parsing or saving Excel file" });
  }
});

module.exports=router;