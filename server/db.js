import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {});

export const DataSchema = new mongoose.Schema({
  id: String,
  data: Object,
});
export const DataModel = mongoose.model("Data", DataSchema);
