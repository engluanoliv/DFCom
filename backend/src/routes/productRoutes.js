import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../controllers/productController";

const router = express.Router();

router.post("/", createProduct);
router.get("/", listProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
