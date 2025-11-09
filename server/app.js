import express from "express";//Express → server framework for handling HTTP requests.
import dotenv from "dotenv";//dotenv → to read environment variables like database URL and JWT secret.
import connectDB from "./config/db.js";//onnectDB → function to connect to MongoDB.
import authRoutes from "./src/routes/authRoutes.js";
import documentRoutes from "./src/routes/documentRoutes.js";//uthRoutes & documentRoutes → your route handlers.

dotenv.config();//dotenv.config() → loads .env file so you can use secrets safely.
connectDB();//connectDB() → connects to MongoDB before starting the server.

const app = express();//Create an Express app.
app.use(express.json());//express.json() → middleware to automatically parse incoming JSON requests.

app.post("/api/test", (req, res) => {
  res.send("Test route works!");
});//A simple test route to check if your server is running.You can open /api/test in Postman or browser → should return "Test route works!".


app.use("/api/auth", authRoutes);///api/auth → handles signup and login routes.
app.use("/api/documents", documentRoutes);///api/documents → handles document CRUD routes.

app.listen(5000, () => console.log("Server running on port 5000"));//Starts the server on port 5000.After this, your backend can receive requests from Postman or your frontend.

/*Purpose - This file starts your backend server, connects to the database, and registers all the API routes.
Think of it as the central control room for your backend.

Express app → your server building

Middleware (express.json) → staff that reads and understands incoming requests

Routers → different departments handling specific tasks

connectDB → connect the server to the database

app.listen → opens the doors so users can start sending requests.*/