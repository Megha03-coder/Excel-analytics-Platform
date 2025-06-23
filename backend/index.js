const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const uploadRoutes = require("./routes/upload");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();


const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked origin:", origin); // for debugging
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));



app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err.message));

// ✅ API Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);

// ✅ Start Server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
