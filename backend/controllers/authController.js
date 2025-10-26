import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // Import jsonwebtoken for JWT token generation
import User from "../models/User.js"; // Import User model (for admin users)

// =============================
// Admin Registration Controller
// =============================
// Optional route for seeding a single admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Get data from request body

    // Check if admin with this email already exists
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Admin already exists" });

    // Hash the password before saving
    const hashed = await bcrypt.hash(password, 10);

    // Create a new admin user
    const user = new User({ name, email, password: hashed });
    await user.save();

    // Respond with success message
    res.json({ message: "Admin registered successfully" });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: err.message });
  }
};

// =============================
// Admin Login Controller
// =============================
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body; // Get login credentials

    // Find the admin user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare input password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token with user id and role, valid for 1 day
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Respond with the token
    res.json({ token });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: err.message });
  }
};