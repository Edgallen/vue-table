import mongoose from "mongoose";

const TableSchema = new mongoose.Schema(
  {
    tableData: [{ type: mongoose.Schema.Types.ObjectId, ref: "TableData" }],
    totalPages: { type: Number, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("Table", TableSchema);
