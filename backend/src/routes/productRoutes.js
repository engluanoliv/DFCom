import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from "../controllers/productController.js";
import {
  createReview,
  listReviewsByProductId,
} from "../controllers/reviewController.js";

const router = express.Router();

// Create a Product
router.post("/", createProduct);

// List all Products
router.get("/", listProducts);

// Get product by productId
router.get("/:productId", getProduct);

//Update Product
router.put("/:productId", updateProduct);

// Delete Product
router.delete("/:productId", deleteProduct);

// List all Reviews by productId
router.get("/:productId/reviews", listReviewsByProductId);

// Create Review
router.post("/:productId/reviews", createReview);

export default router;
