import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Note", noteSchema);
