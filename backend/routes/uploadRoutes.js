import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/authMiddleware.js";
import { uploadAndDistribute } from "../controllers/uploadController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", authMiddleware, upload.single("file"), uploadAndDistribute);

export default router;