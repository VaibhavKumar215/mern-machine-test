import jwt from "jsonwebtoken"; // Import JWT library
import User from "../models/User.js"; // Import User model

// =============================
// Authentication Middleware
// =============================
// Verifies JWT token from Authorization header and attaches the user to the request
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // Get Authorization header

    // Check if Authorization header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Extract token from header
    const token = authHeader.split(" ")[1];

    // Verify the token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database (exclude password)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the user object to the request for further use in controllers
    req.user = user;

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;