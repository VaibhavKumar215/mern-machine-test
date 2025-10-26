import Agent from "../models/Agent.js"; // Import Agent model
import List from "../models/List.js";   // Import List model (tasks)

// =============================
// Get Summary Controller
// =============================
// Returns a summary of the total number of agents and total tasks
export const getSummary = async (req, res) => {
  try {
    // Count total agents in the database
    const totalAgents = await Agent.countDocuments();

    // Count total tasks in the database
    const totalTasks = await List.countDocuments();

    // Respond with a JSON object containing summary
    res.json({
      totalAgents,
      totalTasks,
    });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: err.message });
  }
};
