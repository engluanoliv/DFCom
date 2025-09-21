import { productService } from "@/services/productServices";
import { reviewService } from "@/services/reviewServices";
import type { Product, Review } from "@/types/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      setReviewsLoading(false);
      return;
    }
    fetchProductDetails(id);
    fetchProductReviews(id);
  }, [id]);

  // AQUI EU PODERIA TRAZER OS REVIEWS JUNTO COM AS INFORMACOES DO PRODUTO, MAS ESCOLHI FAZER A REQUISIÇÃO SEPARADA
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

  // REQUISIÇÃO SEPARADA PARA FAZER O FETCH NOS REVIEWS
  const fetchProductReviews = async (productId: string) => {
    setReviewsLoading(true);
    try {
      const response = await reviewService.getAll(productId);
      setReviews(response);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      toast.error("Erro ao carregar avaliações");
    } finally {
      setReviewsLoading(false);
    }
  };

  return { product, reviews, isLoading, reviewsLoading, fetchProductReviews };
};
