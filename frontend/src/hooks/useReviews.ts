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
        .get(`/products/${productId}/reviews`)
        .then((res) => res.data);
      setReviews(response);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      toast.error("Erro ao carregar avaliações");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (values: ReviewSchemaType, review?: Review) => {
    if (!productId) return;
    try {
      if (review) {
        await api.put(`/reviews/${review._id}`, values);
        toast.success("Avaliação atualizada 📝");
      } else {
        await api.post(`/products/${productId}/reviews`, values);
        toast.success("Avaliação criada 🥳");
      }
      await fetchReviews();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar avaliação");
    }
  };

  const handleDelete = async (reviewId: string) => {
    try {
      await api.delete(`/reviews/${reviewId}`);
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

  return { reviews, isLoading, fetchReviews, handleSave, handleDelete };
};
