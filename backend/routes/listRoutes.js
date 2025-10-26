import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"; // Import authentication middleware
import { getAgentLists } from "../controllers/listController.js"; // Import list controller

const router = express.Router(); // Create a new Express router

// =============================
// Agent List Routes
// =============================

// Fetches all tasks assigned to a specific agent by ID
// Protected route: requires valid JWT token
router.get("/:id", authMiddleware, getAgentLists);

export default router; // Export router for use in main app
