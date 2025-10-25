import bcrypt from "bcryptjs";
import Agent from "../models/Agent.js";

export const addAgent = async (req, res) => {
  try {
    let { name, email, mobile, password } = req.body;
    console.log(req.body)

    // Basic validation
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Ensure mobile has +91 prefix
    if (!mobile.startsWith("+91")) {
      mobile = `+91${mobile}`;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate mobile format (should be +91 followed by 10 digits)
    const mobileRegex = /^\+91\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({ message: "Invalid mobile number format" });
    }

    // Check if email or mobile already exists
    const existingAgent = await Agent.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingAgent) {
      const field = existingAgent.email === email ? "email" : "mobile number";
      return res
        .status(400)
        .json({ message: `Agent with this ${field} already exists` });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new agent
    const agent = new Agent({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    await agent.save();

    res.status(201).json({
      message: "Agent added successfully",
    });
  } catch (err) {
    console.error("Error in addAgent:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find()
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};