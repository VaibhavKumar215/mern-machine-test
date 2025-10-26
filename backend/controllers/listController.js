import List from "../models/List.js"; // Import List model (tasks)

// =============================
// Get Lists for a Specific Agent
// =============================
// Fetches all tasks assigned to the currently logged-in agent
export const getAgentLists = async (req, res) => {
  try {
    const { id } = req.params; // Get agent ID from URL parameters

    // Validate that ID is provided
    if (!id) return res.status(400).json({ message: "ID is required" });

    // Find tasks in the List collection that match the agent ID
    // Only select relevant fields: firstName, phone, notes, createdAt
    const tasks = await List.find({ agentId: id }).select(
      "firstName phone notes createdAt"
    );

    // If no tasks found, respond with 404
    if (!tasks.length) {
      return res.status(404).json({ message: "No tasks found for this agent" });
    }

    // Send tasks as JSON response
    res.json(tasks);
  } catch (err) {
    // Handle any server errors
    res.status(500).json({ message: err.message });
  }
};