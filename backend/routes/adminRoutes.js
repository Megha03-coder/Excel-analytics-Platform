const express = require("express");
const User = require("../models/User");
const Upload = require("../models/Upload");
const verifyAdmin = require("../middleware/verifyAdmin");

const router = express.Router();

// Get all users
router.get("/users", verifyAdmin, async (req, res) => {
  const users = await User.find({}, "-password");
  res.json(users);
});

// Get all uploads
router.get("/uploads", verifyAdmin, async (req, res) => {
  const uploads = await Upload.find().populate("userId", "name email");
  res.json(uploads);
});

// backend/routes/adminRoutes.js

router.post("/make-admin", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { isAdmin: true },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User promoted to admin", user });
  } catch (err) {
    res.status(500).json({ message: "Failed to update user" });
  }
});

module.exports = router;
