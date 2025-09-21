import api from "@/config/axios";
import type { ProductSchemaType } from "@/schemas/schemas";
import type { Product } from "@/types/types";

export const productService = {
  async getAll(): Promise<Product[]> {
    const response = await api.get("/products");
    return response.data;
  },

  async getProduct(productId: string): Promise<Product> {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  },

  async create(values: ProductSchemaType): Promise<Product> {
    const response = await api.post("/products", values);
    return response.data;
  },

  async update(productId: string, values: ProductSchemaType): Promise<Product> {
    const response = await api.put(`/products/${productId}`, values);
    return response.data;
  },

  async delete(productId: string): Promise<void> {
    await api.delete(`/products/${productId}`);
  },

  async deleteMany(productIds: string[]): Promise<void> {
    await Promise.all(productIds.map((id) => api.delete(`/products/${id}`)));
  },
};
