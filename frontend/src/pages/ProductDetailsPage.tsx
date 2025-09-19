import ReviewCard from "@/components/ReviewCard/ReviewCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import api from "@/config/axios";
import type { Product, Review } from "@/types/types";
import { ArrowLeft, Loader2 } from "lucide-react";
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
          className="mb-4 !ps-0 text-sm hover:cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row w-full justify-between items-center py-6 gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start text-[16px] w-fit gap-2">
          <h1 className="text-lg text-left font-semibold text-wrap line-clamp-1">
            <span className="text-semibold">Produto: </span>
            {product.name}
          </h1>
          <p className="text-sm text-left capitalize">
            <span className="font-semibold">Preço: </span>R$
            {product.price.toFixed(2)}
          </p>
          <p className="text-sm text-left capitalize">
            <span className="font-semibold">Categoria: </span>
            {product.category}
          </p>
          <p className="text-sm text-left capitalize max-w-lg">
            <span className="font-semibold">Descrição: </span>
            {product.description}
          </p>
        </div>
        <Button className="bg-green-600 w-fit self-end sm:self-center">
          Nova Avaliação
        </Button>
      </div>

      <Separator />

      {/* List of Reviews */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {reviewsLoading ? (
          <div className="min-h-[200px] flex items-center justify-center">
            <p className="text-center font-semibold text-lg pr-2">
              Carregando avaliações
            </p>
            <Loader2 className="animate-spin" />
          </div>
        ) : reviews?.length === 0 ? (
          <div className="min-h-[200px] flex items-center justify-center">
            <p className="text-center font-semibold text-lg">
              Nenhuma avaliação ainda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {reviews?.map((review) => (
              <ReviewCard key={review?._id} review={review} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
