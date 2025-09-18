import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./lib/db.js";
import productRoutes from "./routes/productRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 5500;

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
