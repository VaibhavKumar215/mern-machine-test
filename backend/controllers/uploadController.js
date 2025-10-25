import fs from "fs";
import path from "path";
import csv from "csv-parser";
import Agent from "../models/Agent.js";
import List from "../models/List.js";

export const uploadAndDistribute = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const allowedExtensions = [".csv", ".xlsx", ".axls"];
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      fs.unlinkSync(file.path);
      return res
        .status(400)
        .json({ message: "Invalid file type. Only CSV, XLSX, or AXLS allowed." });
    }

    const results = [];
    fs.createReadStream(file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          const agents = await Agent.find();
          if (!agents.length) {
            fs.unlinkSync(file.path);
            return res.status(400).json({
              message: "No agents found. Please create agents before uploading lists.",
            });
          }

          const requiredFields = ["FirstName", "Phone", "Notes"];
          const headers = Object.keys(results[0] || {});
          const isValid = headers.length === requiredFields.length &&
                          requiredFields.every((field) => headers.includes(field));
          if (!isValid) {
            fs.unlinkSync(file.path);
            return res.status(400).json({
              message: "Invalid CSV format. Expected headers: FirstName, Phone, Notes",
            });
          }

          // Distribute items among agents and update totalTasks
          for (let i = 0; i < results.length; i++) {
            const agentIndex = i % agents.length;
            const agent = agents[agentIndex];

            await List.create({
              agentId: agent._id,
              firstName: results[i].FirstName,
              phone: results[i].Phone,
              notes: results[i].Notes,
            });

            // Increment totalTasks for this agent (preserve existing count)
            agent.totalTasks = (agent.totalTasks || 0) + 1;
            await agent.save();
          }

          fs.unlinkSync(file.path);
          res.json({ message: "File processed, tasks distributed, and agent totalTasks updated!" });
        } catch (error) {
          fs.unlinkSync(file.path);
          res.status(500).json({ message: error.message });
        }
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};