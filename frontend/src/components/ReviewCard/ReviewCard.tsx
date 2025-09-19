import type { Review } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { StarRating } from "../ui/star-rating";
import { Calendar, EllipsisVertical } from "lucide-react";
import { formatDateBR } from "@/utils/formatDate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type ReviewCardProps = {
  review: Review;
  onEdit: (review: Review) => void;
  onDelete: (reviewId: string) => void;
};

export default function ReviewCard({
  review,
  onDelete,
  onEdit,
}: ReviewCardProps): JSX.Element {
  const DICEBEAR_URL = import.meta.env.VITE_DICEBEAR_URL;
  const randomSeed = Math.random().toString(36).substring(2, 10);
  const avatarUrl = `${DICEBEAR_URL}?seed=${randomSeed}`;
  return (
    <>
      <Card className="w-full h-[250px] relative">
        {/* Actions */}
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:cursor-pointer">
              <EllipsisVertical className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onClick={() => onEdit(review)}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onClick={() => onDelete(review._id)}
              >
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <CardContent className="flex flex-col w-full h-full gap-4 p-6">
          <div className="flex items-center justify-between">
            <Avatar className="rounded-full size-16 border border-[#E5E7EB]">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>{review.author}</AvatarFallback>
            </Avatar>
            <StarRating rating={review.rating} />
          </div>
          <div className="flex flex-col justify-between text-start gap-2 flex-1">
            <div>
              <p className="text-sm capitalize font-semibold">
                {review.author}
              </p>
              <p className="text-sm capitalize line-clamp-3">
                {review.comment}
              </p>
            </div>
            <span className="flex gap-1 items-center text-[#64748B]">
              <Calendar className="size-4" />
              <p className="text-sm font-light">
                {formatDateBR(review.createdAt)}
              </p>
            </span>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
