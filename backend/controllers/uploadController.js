import fs from "fs"; // Node.js File System module
import path from "path"; // Node.js Path module
import csv from "csv-parser"; // CSV parsing library
import Agent from "../models/Agent.js"; // Import Agent model
import List from "../models/List.js"; // Import List model (tasks)

// =============================
// Upload CSV/XLSX/AXLS and Distribute Tasks
// =============================
// This controller handles CSV uploads, validates the file and headers,
// distributes tasks among available agents, and updates agent totalTasks.
export const uploadAndDistribute = async (req, res) => {
  try {
    const file = req.file; // Get uploaded file from request
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Validate file type
    const allowedExtensions = [".csv", ".xlsx", ".axls"];
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      fs.unlinkSync(file.path); // Delete invalid file
      return res
        .status(400)
        .json({ message: "Invalid file type. Only CSV, XLSX, or AXLS allowed." });
    }

    const results = [];

    // Parse CSV file
    fs.createReadStream(file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data)) // Collect each row
      .on("end", async () => {
        try {
          // Fetch all agents
          const agents = await Agent.find();
          if (!agents.length) {
            fs.unlinkSync(file.path); // Delete file
            return res.status(400).json({
              message: "No agents found. Please create agents before uploading lists.",
            });
          }

          // Validate CSV headers
          const requiredFields = ["FirstName", "Phone", "Notes"];
          const headers = Object.keys(results[0] || {});
          const isValid =
            headers.length === requiredFields.length &&
            requiredFields.every((field) => headers.includes(field));

          if (!isValid) {
            fs.unlinkSync(file.path); // Delete invalid file
            return res.status(400).json({
              message: "Invalid CSV format. Expected headers: FirstName, Phone, Notes",
            });
          }

          // Distribute tasks among agents in a round-robin manner
          for (let i = 0; i < results.length; i++) {
            const agentIndex = i % agents.length; // Round-robin index
            const agent = agents[agentIndex];

            // Create a new task for the agent
            await List.create({
              agentId: agent._id,
              firstName: results[i].FirstName,
              phone: results[i].Phone,
              notes: results[i].Notes,
            });

            // Increment the agent's totalTasks count
            agent.totalTasks = (agent.totalTasks || 0) + 1;
            await agent.save();
          }

          // Delete the file after processing
          fs.unlinkSync(file.path);

          // Send success response
          res.json({
            message: "File processed, tasks distributed, and agent totalTasks updated!",
          });
        } catch (error) {
          fs.unlinkSync(file.path); // Delete file on error
          res.status(500).json({ message: error.message });
        }
      });
  } catch (err) {
    // Handle any unexpected server errors
    res.status(500).json({ message: err.message });
  }
};