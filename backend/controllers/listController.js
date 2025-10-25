import List from "../models/List.js";

// Fetch lists assigned to the currently logged-in agent
export const getAgentLists = async (req, res) => {
  try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: "ID is required" });
  
      // Find tasks for the given agent ID
      const tasks = await List.find({ agentId: id }).select("firstName phone notes createdAt");
  
      if (!tasks.length) {
        return res.status(404).json({ message: "No tasks found for this agent" });
      }
  
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};
