import express from "express";
import { addAgent, getAgents } from "../controllers/agentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",authMiddleware, addAgent);
router.get("/",authMiddleware, getAgents);

export default router;
