import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Admin registration (optional, for seeding one admin)
export const registerAdmin = async (req, res) => {
  try {
    const {name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();
    res.json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    // .select("-mobile -email");
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    // const { password: pwd, ...adminData } = user.toObject();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Agent Login
// export const agentLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find the agent by email
//     const agent = await Agent.findOne({ email });
//     if (!agent) return res.status(400).json({ message: "Agent not found" });

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, agent.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     // Remove password before sending agent info
//     const { password: pwd, ...agentData } = agent.toObject();

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: agent._id, role: "agent" },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     // Fetch all tasks for this agent
//     // const tasks = await List.find({ agentId: agent._id }).select("firstName phone notes createdAt");

//     // Send response with token and tasks
//     res.json({ token, agentData });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

