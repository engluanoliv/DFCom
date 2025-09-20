import express from "express";
import {
  deleteReview,
  updateReview,
} from "../controllers/reviewController.js";

const router = express.Router();

// Update Review by reviewId
router.put("/:reviewId", updateReview);

// Delete Review
router.delete("/:reviewId", deleteReview);

export default router;
