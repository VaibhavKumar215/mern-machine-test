import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import Agent from "../models/Agent.js"; // Import Agent model

// Controller to add a new agent
export const addAgent = async (req, res) => {
  try {
    let { name, email, mobile, password } = req.body; // Destructure incoming data from request body
    console.log(req.body); // Log request body for debugging

    // Basic validation: check if all required fields are provided
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Ensure mobile number has '+91' prefix
    if (!mobile.startsWith("+91")) {
      mobile = `+91${mobile}`;
    }

    // Validate email format using regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate mobile format: should start with +91 followed by 10 digits
    const mobileRegex = /^\+91\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({ message: "Invalid mobile number format" });
    }

    // Check if an agent with the same email or mobile already exists
    const existingAgent = await Agent.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingAgent) {
      // Determine which field is already taken
      const field = existingAgent.email === email ? "email" : "mobile number";
      return res
        .status(400)
        .json({ message: `Agent with this ${field} already exists` });
    }

    // Hash the password before storing in database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new agent instance
    const agent = new Agent({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    // Save the new agent to the database
    await agent.save();

    // Respond with success message
    res.status(201).json({
      message: "Agent added successfully",
    });
  } catch (err) {
    console.error("Error in addAgent:", err); // Log error for debugging
    res.status(500).json({ message: "Server error" }); // Generic server error response
  }
};

// Controller to fetch all agents
export const getAgents = async (req, res) => {
  try {
    // Fetch all agents from the database
    const agents = await Agent.find();
    
    // Return agents as JSON
    res.json(agents);
  } catch (err) {
    // Handle errors and respond with 500 status
    res.status(500).json({ message: err.message });
  }
};