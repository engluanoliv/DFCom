import ReviewCard from "@/components/ReviewCard/ReviewCard";
import ReviewModal from "@/components/ReviewModal/ReviewModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
// import { useProduct } from "@/hooks/useProduct";
import { useReviews } from "@/hooks/useReviews";
import type { ReviewSchemaType } from "@/schemas/schemas";
import type { Review } from "@/types/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetailsPage(): JSX.Element {
  const { id } = useParams();
  // const { product, isLoading } = useProduct(id ?? "");
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

  return (
    <div className="flex flex-col gap-4">
      {/* Product Details */}
      <Button
        onClick={() => handleOpenModal()}
        className="bg-green-700 w-fit self-end sm:self-center"
      >
        Nova Avaliação
      </Button>

      {/* List of Reviews */}
      <div className="w-full lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {reviewsLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton className="h-[190px]" key={index} />
          ))
        ) : reviews?.length === 0 ? (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 min-h-[200px] flex items-center justify-center">
            <p className="text-center font-semibold text-lg">
              Nenhuma avaliação ainda.
            </p>
          </div>
        ) : (
          reviews?.map((review) => (
            <ReviewCard
              onDelete={handleDeleteReview}
              onEdit={handleEditReview}
              key={review?._id}
              review={review}
            />
          ))
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
