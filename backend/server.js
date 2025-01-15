import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectToMongoDB();

// Middleware to parse JSON
app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello world !!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
