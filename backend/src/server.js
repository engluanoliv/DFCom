import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./lib/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
