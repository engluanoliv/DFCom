import Review from "../models/Review.js";

export const createReviewService = async ({
  author,
  rating,
  comment,
  productId,
}) => {
  const newReview = new Review({
    author,
    rating,
    comment,
    productId,
  });
  return await newReview.save();
};

export const listReviewsService = async (productId) => {
  return await Review.find({ productId }).sort({ createdAt: -1 });
};

export const updateReviewService = async (
  reviewId,
  { author, rating, comment }
) => {
  return Review.findByIdAndUpdate(
    reviewId,
    {
      author,
      rating,
      comment,
    },
    { new: true }
  );
};

export const deleteReviewService = async (reviewId) => {
  await Review.findByIdAndDelete(reviewId);
};
