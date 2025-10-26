import express from "express";
import { addAgent, getAgents } from "../controllers/agentController.js"; // Import agent controllers
import authMiddleware from "../middleware/authMiddleware.js"; // Import authentication middleware

const router = express.Router(); // Create a new Express router

// =============================
// Agent Routes
// =============================

// Adds a new agent
// Protected route: requires valid JWT token
router.post("/", authMiddleware, addAgent);

// Fetches all agents
// Protected route: requires valid JWT token
router.get("/", authMiddleware, getAgents);

export default router; // Export router for use in main app
