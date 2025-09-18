import express from "express";
import {
  createReview,
  deleteReview,
  listReviewsByProductId,
  updateReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/:productId", createReview);

router.get("/:productId", listReviewsByProductId);

router.put("/review/:reviewId", updateReview);

router.delete("/review/:reviewId", deleteReview);

export default router;
