import express from "express";
import { registerAdmin, adminLogin } from "../controllers/authController.js"; // Import auth controllers
import adminRegisterMiddleware from "../middleware/adminRegisterMiddleware.js"; // Middleware to check secret key for admin registration

const router = express.Router(); // Create a new Express router

// =============================
// Admin Authentication Routes
// =============================

// Registers a new admin user
// Protected by adminRegisterMiddleware: checks for a secret key in headers
router.post("/registerAdmin", adminRegisterMiddleware, registerAdmin);

// Admin login route
// Accepts email and password, returns JWT token if credentials are valid
router.post("/admin-login", adminLogin);

export default router;
