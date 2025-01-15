import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

// Define the routes relative to the base path
router.post("/signup", signup); // POST /api/auth/signup
router.post("/login", login);   // POST /api/auth/login
router.post("/logout", logout); // POST /api/auth/logout

export default router;
