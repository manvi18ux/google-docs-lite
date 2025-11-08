import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import documentRoutes from "./src/routes/documentRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.post("/api/test", (req, res) => {
  res.send("Test route works!");
});


app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
