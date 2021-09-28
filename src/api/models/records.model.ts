import * as mongoose from "mongoose";

const recordsSchema = new mongoose.Schema({
  key: String,
  createdAt: Date,
  totalCount: Array,
});

export default mongoose.model("records", recordsSchema);
