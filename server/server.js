import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import crypto from "crypto";
import dotenv from "dotenv";
import { DataModel } from "./db.js";

const app = express();
const port = process.env.PORT || 5000;
const DEPLOYED_URL = "https://mock-api-t018.onrender.com";

app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.send("Healthy Server");
});

// Store data
app.post("/store", async (req, res) => {
  const id = crypto.randomUUID();
  const newData = new DataModel({ id, data: req.body });
  await newData.save();
  res.json({ url: `${DEPLOYED_URL}/data/${id}` });
});

// Retrieve data
app.get("/data/:id", async (req, res) => {
  const storedData = await DataModel.findOne({ id: req.params.id });
  if (storedData) {
    res.json(storedData.data);
  } else {
    res.status(404).json({ error: "Data not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
