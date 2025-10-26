import express from "express";
import cors from "cors"; // Middleware to enable CORS (Cross-Origin Resource Sharing)
import dotenv from "dotenv"; // Load environment variables from .env file
import connectDB from "./config/db.js"; // Function to connect to MongoDB
import authRoutes from "./routes/authRoutes.js"; // Auth routes
import agentRoutes from "./routes/agentRoutes.js"; // Agent routes
import uploadRoutes from "./routes/uploadRoutes.js"; // File upload routes
import listRoutes from "./routes/listRoutes.js"; // Agent list routes
import dashboardRoutes from "./routes/dashboardRoutes.js"; // Dashboard routes

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

// =============================
// App Configuration
// =============================
const app = express();

// =============================
// Middleware
// =============================
// Enable CORS for all routes
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// =============================
// Base Route
// =============================
// Simple route to verify server is running
app.get("/", (req, res) => {
  res.send("Server is running");
});

// =============================
// API Routes
// =============================
// Auth-related routes
app.use("/api/auth", authRoutes);

// Agent management routes
app.use("/api/agents", agentRoutes);

// File upload and task distribution routes
app.use("/api/upload", uploadRoutes);

// Agent-specific task list routes
app.use("/api/list", listRoutes);

// Dashboard routes (summary stats)
app.use("/api/dashboard", dashboardRoutes);

// =============================
// Start Server
// =============================
const PORT = process.env.PORT || 5000; // Use environment PORT or default 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
