import ReviewCard from "@/components/ReviewCard/ReviewCard";
import ReviewModal from "@/components/ReviewModal/ReviewModal";
import { Button } from "@/components/ui/button";
import ConfirmDeleteModal from "@/components/ui/confirm-delete-dialog";
import EmptyCards from "@/components/ui/empty-cards";
import EmptyState from "@/components/ui/empty-state";
import { StarRating } from "@/components/ui/star-rating";
import { useProduct } from "@/hooks/useProduct";
import { useReviews } from "@/hooks/useReviews";
import type { ReviewSchemaType } from "@/schemas/schemas";
import type { Review } from "@/types/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetailsPage(): JSX.Element {
  const { productId } = useParams();
  const { product, averageRating } = useProduct(productId);
  const {
    reviews,
    isLoading: reviewsLoading,
    handleSave,
    handleDelete,
  } = useReviews(productId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
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
    await handleSave(values, review);
  };

  const handleEditReview = (review: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviewId(reviewId);
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (reviewId) {
      await handleDelete(reviewId);
    }
    setIsAlertOpen(false);
  };

  const hasReviews = reviews && reviews?.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between lg:px-8">
        <div className="text-left flex flex-col gap-2">
          <div className="line-clamp-1">
            <p className="font-semibold text-2xl">{product?.name}</p>
          </div>
          <StarRating rating={averageRating} />
          <p className="text-base font-semibold">{averageRating} de 5</p>
        </div>
        {/* Product Details */}
        <Button
          onClick={() => handleOpenModal()}
          className="bg-green-700 w-fit self-end hover:cursor-pointer"
        >
          <Plus className="sm:hidden" />
          <span className="hidden sm:flex">Avaliar Produto</span>
        </Button>
      </div>

      {/*Empty Review */}
      {!hasReviews && (
        <div className="flex w-full justify-center">
          <EmptyCards isLoading={reviewsLoading}>
            <EmptyState
              className="-mt-32 md:-mt-48 relative"
              emoji="💭"
              title="Nenhuma Avaliação para o produto"
              description="Ainda não existe avaliações para este produto."
            />
          </EmptyCards>
        </div>
      )}

      {/* List of reviews */}
      {hasReviews && (
        <div className="w-full lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

      {/* Review Modal */}
      {productId && (
        <ReviewModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          productId={productId}
          onSave={handleSaveReview}
          review={selectedReview}
        />
      )}

      {/* Confirm Modal */}
      <ConfirmDeleteModal
        isOpen={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
