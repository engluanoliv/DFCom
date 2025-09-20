import type { PRODUCT_CATEGORIES } from "@/constants/categories";

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  createdAt: Date;
};

export type Review = {
  _id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: Date;
};
