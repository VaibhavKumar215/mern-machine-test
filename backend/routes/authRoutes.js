import express from "express";
import { registerAdmin,adminLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/registerAdmin", registerAdmin);
router.post("/admin-login", adminLogin);

export default router;
