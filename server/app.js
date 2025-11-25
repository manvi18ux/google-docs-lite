import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import documentRoutes from "./src/routes/documentRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);

// Root test
app.get("/", (req, res) => {
  res.json({ message: "Google Docs Lite API Working" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Express API running on port ${PORT}`);
});
