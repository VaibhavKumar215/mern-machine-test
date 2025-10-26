import express from "express";
import { getSummary } from "../controllers/dashboardController.js"; // Import dashboard controller
import authMiddleware from "../middleware/authMiddleware.js"; // Import authentication middleware

const router = express.Router(); // Create a new Express router

// =============================
// Dashboard Routes
// =============================

// Fetches a summary of total agents and total tasks
// Protected route: requires valid JWT token
router.get("/summary", authMiddleware, getSummary);

export default router;
