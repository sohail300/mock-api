// Backend (server.js)
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto");
import dotenv from "dotenv";
import { DataModel } from "./db";

const app = express();
const port = 5000;

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
  res.json({ url: `http://localhost:${port}/data/${id}` });
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
  console.log(`Server running at http://localhost:${port}`);
});
