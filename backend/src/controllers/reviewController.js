import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { author, rating, comment } = req.body;
    if (!author || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const data = {
      author,
      rating,
      comment,
      productId,
    };

    const newReview = new Review(data);
    await newReview.save();

    res.status(200).json(newReview);
  } catch (error) {
    console.error("Error creating review", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const listReviewsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = Review.find({ productId }).sort({ createdAt: -1 });

    if (!reviews) {
      return res
        .status(400)
        .json({ message: "No reviews are found for this product" });
    }

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

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      {
        author,
        rating,
        comment,
      },
      { new: true }
    );

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

    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ json: "Review deleted" });
  } catch (error) {
    console.error("Error deleting reviews", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
