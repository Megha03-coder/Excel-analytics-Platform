const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();



app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use("/api/upload", uploadRoutes);

mongoose.connect("mongodb+srv://exceluser:excelpass123@cluster0.ourqfbl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB Atlas Connection Error:", err));




app.get('/', (req, res) => {
  res.send("API Running");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});




