import ReviewCard from "@/components/ReviewCard/ReviewCard";
import ReviewModal from "@/components/ReviewModal/ReviewModal";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/hooks/useProduct";
import { useReviews } from "@/hooks/useReviews";
import type { ReviewSchemaType } from "@/schemas/schemas";
import type { Review } from "@/types/types";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetailsPage(): JSX.Element {
  const { id } = useParams();
  const { product, isLoading } = useProduct(id ?? "");
  const {
    reviews,
    isLoading: reviewsLoading,
    saveReview,
    deleteReview,
  } = useReviews(id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | undefined>(
    undefined
  );

  const handleOpenModal = (review?: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleSaveReview = async (
    values: ReviewSchemaType,
    review?: Review
  ) => {
    await saveReview(values, review);
  };

  const handleEditReview = (review: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleDeleteReview = async (reviewId: string) => {
    await deleteReview(reviewId);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <div className="max-w-[1280px] mx-auto">
      {/* Product Details */}
      <div className="flex flex-col sm:flex-row w-full justify-between items-center py-6 gap-4 px-4 sm:px-6 lg:px-8">
        {/* <div className="flex flex-col items-start text-[16px] w-fit gap-2">
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
        </div> */}
        <Button
          onClick={() => handleOpenModal()}
          className="bg-green-600 w-fit self-end sm:self-center"
        >
          Nova Avaliação
        </Button>
      </div>

      {/* List of Reviews */}
      <div className="w-full  lg:px-8 py-14">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {reviews?.map((review) => (
              <ReviewCard
                onDelete={handleDeleteReview}
                onEdit={handleEditReview}
                key={review?._id}
                review={review}
              />
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {id && (
        <ReviewModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          productId={id}
          onSave={handleSaveReview}
          review={selectedReview}
        />
      )}
    </div>
  );
}
