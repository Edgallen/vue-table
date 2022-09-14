import mongoose from "mongoose";

const tableDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  distance: { type: Number, required: true },
  createdAt: { type: String, required: true },
});

export default mongoose.model("TableData", tableDataSchema);
