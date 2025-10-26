import express from "express";
import { registerAdmin,adminLogin } from "../controllers/authController.js";
import adminRegisterMiddleware from "../middleware/adminRegisterMiddleware.js";

const router = express.Router();

router.post("/registerAdmin",adminRegisterMiddleware, registerAdmin);
router.post("/admin-login", adminLogin);

export default router;
