import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import type { Review } from "@/types/types";
import { reviewSchema, type ReviewSchemaType } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import ReviewModalForm from "./ReviewModalForm";

type ReviewModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: ReviewSchemaType, review?: Review) => Promise<void>;
  productId: string;
  review?: Review;
};

export default function ReviewModal({
  isOpen,
  onOpenChange,
  review,
  onSave,
  productId,
}: ReviewModalProps): JSX.Element {
  const form = useForm<ReviewSchemaType>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      productId,
      author: "",
      rating: 0,
      comment: "",
    },
    mode: "onSubmit",
  });

  const { formState, reset } = form;

  useEffect(() => {
    if (review) {
      reset({
        productId,
        author: review.author,
        rating: review.rating,
        comment: review.comment,
      });
    } else {
      reset({
        productId,
        author: "",
        rating: 0,
        comment: "",
      });
    }
  }, [isOpen, review, reset, productId]);

  const onSubmit = async (values: ReviewSchemaType) => {
    await onSave(values, review);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[400px] rounded-lg">
          <DialogHeader>
            <DialogTitle>
              {review ? "Editar Avaliação" : "Nova Avaliação"}
            </DialogTitle>
            <DialogDescription>
              {review
                ? "Altere os campos para atualizar a avaliação"
                : "Preencha os campos para adicionar uma nova avaliação"}
            </DialogDescription>
          </DialogHeader>
          <ReviewModalForm
            form={form}
            onSubmit={onSubmit}
            isSubmitting={formState.isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
