import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

// Use the PORT from the environment variable or default to 5000 if not provided
const PORT = process.env.PORT || 5000; 

// Ensure the server uses the correct directory for static files
const __dirname = path.resolve();
const frontendPath = path.join(__dirname, "frontend", "dist");

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Define API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Serve static files from the frontend's `dist` directory
app.use(express.static(frontendPath));

// Send the frontend's `index.html` file for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Connect to MongoDB and start the server
server.listen(PORT, '0.0.0.0', () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
