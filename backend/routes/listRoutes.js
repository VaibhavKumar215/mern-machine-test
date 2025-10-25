import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {  getAgentLists } from "../controllers/listController.js";

const router = express.Router();

// Admin - view all distributed lists
// router.get("/all",authMiddleware, getAllLists);

// Agent - view only their assigned lists
// router.get("/my-lists",authMiddleware, getAgentLists);

router.get("/:id",authMiddleware, getAgentLists);

export default router;
