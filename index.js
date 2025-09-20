const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contact", contactRoutes);

// MongoDB connection (optional if you want to store submissions)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Serve static files (if using React build)
app.use(express.static(path.join(__dirname, "dist")));


// Fallback route for SPA (React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


// Start server
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
