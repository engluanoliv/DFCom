import api from "@/config/axios";
import type { ReviewSchemaType } from "@/schemas/schemas";
import type { Review } from "@/types/types";

export const reviewService = {
  async getAll(productId: string): Promise<Review[]> {
    const response = await api.get(`/products/${productId}/reviews`);
    return response.data;
  },

  async create(productId: string, values: ReviewSchemaType): Promise<void> {
    await api.post(`/products/${productId}/reviews`, values);
  },

  async update(review: Review, values: ReviewSchemaType): Promise<void> {
    await api.put(`/reviews/${review._id}`, values);
  },
  async delete(reviewId: string): Promise<void> {
    await api.delete(`/reviews/${reviewId}`);
  },
};
