import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  agentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Agent",
    required: true
 },
  firstName: String,
  phone: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("List", listSchema);
