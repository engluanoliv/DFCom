import ReviewCard from "@/components/ReviewCard/ReviewCard";
import { Button } from "@/components/ui/button";
import api from "@/config/axios";
import type { Product, Review } from "@/types/types";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function ProductDetailsPage(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
      fetchProductReviews(id);
    }
  }, [id]);

  // AQUI EU PODERIA TRAZER OS REVIEWS JUNTO COM AS INFORMACOES DO PRODUTO, MAS ESCOLHI FAZER A REQUISIÇÃO SEPARADA
  const fetchProductDetails = async (productId: string) => {
    setIsLoading(true);
    try {
      const response = await api
        .get(`/products/${productId}`)
        .then((res) => res.data);
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
      const response = await api
        .get(`/reviews/${productId}`)
        .then((res) => res.data);
      setReviews(response);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      toast.error("Erro ao carregar avaliações");
    } finally {
      setReviewsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <>
      <div className="w-full flex items-center justify-items-start">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 !ps-0 text-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
        </Button>
      </div>

      <div className="flex w-full justify-between items-center">
        <div className="flex flex-col items-start text-[16px]">
          <h1 className="text-xl font-bold">Produto: {product.name}</h1>
          <p>Preço:R$ {product.price.toFixed(2)}</p>
          <p>Categoria:{product.category}</p>
          <p>Descrição:{product.description}</p>
        </div>
        <Button className="bg-green-600">Nova Avaliação</Button>
      </div>

      {/* List of Reviews */}
      <div className="container">
        {reviewsLoading ? (
          <p>Carregando avaliações...</p>
        ) : reviews?.length === 0 ? (
          <p>Nenhuma avaliação ainda.</p>
        ) : (
          reviews?.map((review) => <ReviewCard review={review} />)
        )}
      </div>
    </>
  );
}
