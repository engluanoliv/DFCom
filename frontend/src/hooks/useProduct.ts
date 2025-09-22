import { productService } from "@/services/productServices";
import type { Product } from "@/types/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useProduct = (id: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchProductDetails(id);
    fetchProductAverageRating(id);
  }, [id]);

  const fetchProductDetails = async (productId: string) => {
    setIsLoading(true);
    try {
      const response = await productService.getProduct(productId);
      setProduct(response);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
      toast.error("Erro ao carregar os detalhes do produto");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProductAverageRating = async (productId: string) => {
    try {
      const response = await productService.fetchAverageRating(productId);
      setAverageRating(response.averageRating || 0);
      setTotalReviews(response.totalReviews || 0);
    } catch (error) {
      console.error("Failed to fetch average rating:", error);
      toast.error("Erro ao calcular avaliação média");
    }
  };

  return {
    product,
    isLoading,
    averageRating,
    totalReviews,
    fetchProductDetails,
    fetchProductAverageRating,
  };
};
