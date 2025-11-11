
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import tasksRouter from "./routes/tasks.js";

dotenv.config();

const app = express();

// Allow your dev & deployed frontend to talk to backend
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://todo-ios-rosy.vercel.app" // your deployed frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Todo API is running successfully.");
});

// Task routes
app.use("/tasks", tasksRouter);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on PORT ${PORT}`));
