import Product from "../models/Product.js";
import Review from "../models/Review.js";

export const createProductService = async ({
  name,
  description,
  price,
  category,
}) => {
  const newProduct = new Product({ name, description, price, category });
  return await newProduct.save();
};

export const listProductsService = async () => {
  return await Product.find().sort({ createdAt: -1 });
};

export const getProductService = async (productId) => {
  return await Product.findById(productId);
};

export const updateProductService = async (productId, data) => {
  return await Product.findByIdAndUpdate(productId, data, { new: true });
};

export const deleteProductService = async (productId) => {
  await Product.findByIdAndDelete(productId);
  await Review.deleteMany({ productId });
};

export const getAverageRatingService = async (productId) => {
  const result = await Review.aggregate([
    { $match: { productId: productId } },
    {
      $group: {
        _id: "$productId",
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  return result.length > 0 ? result[0] : { averageRating: 0, totalReviews: 0 };
};
