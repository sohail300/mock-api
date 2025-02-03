import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const DataSchema = new mongoose.Schema({
  id: String,
  data: Object,
});
export const DataModel = mongoose.model("Data", DataSchema);
