import Review from "../models/Review.js";
import {
  createReviewService,
  deleteReviewService,
  listReviewsService,
  updateReviewService,
} from "../services/reviewService.js";

export const createReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { author, rating, comment } = req.body;
    if (!author || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newReview = await createReviewService({
      author,
      rating,
      comment,
      productId,
    });

    res.status(200).json(newReview);
  } catch (error) {
    console.error("Error creating review", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const listReviewsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await listReviewsService(productId);
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { author, rating, comment } = req.body;

    if (!author || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedReview = await updateReviewService(reviewId, {
      author,
      rating,
      comment,
    });

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error updating reviews", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    await deleteReviewService(reviewId);
    res.status(200).json({ json: "Review deleted" });
  } catch (error) {
    console.error("Error deleting reviews", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
