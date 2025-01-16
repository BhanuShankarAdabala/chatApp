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

// Resolve the directory name correctly
const __dirname = path.resolve();

// Assign the port using environment variables or fallback to 5000
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Backend API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Serve static files from the correct frontend's `dist` directory
const frontendPath = path.join(__dirname, "frontend", "dist");
app.use(express.static(frontendPath));

// Handle all other routes by serving the frontend's `index.html`
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start the server and connect to MongoDB
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
