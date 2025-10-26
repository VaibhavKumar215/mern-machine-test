import express from "express";
import multer from "multer"; // Middleware for handling file uploads
import authMiddleware from "../middleware/authMiddleware.js"; // Import authentication middleware
import { uploadAndDistribute } from "../controllers/uploadController.js"; // Import upload controller

const router = express.Router(); // Create a new Express router

// Configure Multer to store uploaded files in the "uploads" directory
const upload = multer({ dest: "uploads/" });

// =============================
// Upload Routes
// =============================

// Handles CSV/XLSX/AXLS file upload and distributes tasks among agents
// Protected route: requires valid JWT token
// Uses Multer middleware to handle file upload (single file with field name "file")
router.post("/", authMiddleware, upload.single("file"), uploadAndDistribute);

export default router; // Export router for use in main app
