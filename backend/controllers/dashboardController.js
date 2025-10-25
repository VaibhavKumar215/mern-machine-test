import Agent from "../models/Agent.js";
import List from "../models/List.js";

export const getSummary = async (req, res) => {
  try {
    const totalAgents = await Agent.countDocuments();
    const totalTasks = await List.countDocuments();

    res.json({
      totalAgents,
      totalTasks,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
