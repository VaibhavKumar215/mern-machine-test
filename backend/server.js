import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js"

dotenv.config();
connectDB();

//app config
const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
    res.send("Server is running")
} )

app.use("/api/auth", authRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/list", listRoutes);
app.use("/api/dashboard", dashboardRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));