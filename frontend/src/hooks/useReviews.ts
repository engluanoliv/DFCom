import api from "@/config/axios";
import type { ReviewSchemaType } from "@/schemas/schemas";
import type { Review } from "@/types/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useReviews = (productId?: string) => {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReviews = async () => {
    if (!productId) return;
    setIsLoading(true);
    try {
      const response = await api
        .get(`/reviews/${productId}`)
        .then((res) => res.data);
      setReviews(response);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      toast.error("Erro ao carregar avaliações");
    } finally {
      setIsLoading(false);
    }
  };

  const saveReview = async (values: ReviewSchemaType, review?: Review) => {
    if (!productId) return;
    try {
      if (review) {
        await api.put(`/reviews/review/${review._id}`, values);
        toast.success("Avaliação atualizada 📝");
      } else {
        await api.post(`/reviews/${productId}`, values);
        toast.success("Avaliação criada 🥳");
      }
      await fetchReviews();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar avaliação");
    }
  };

  const deleteReview = async (reviewId: string) => {
    try {
      await api.delete(`/reviews/review/${reviewId}`);
      toast.success("Avaliação excluída 🗑️");
      await fetchReviews();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir avaliação");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return { reviews, isLoading, fetchReviews, saveReview, deleteReview };
};
