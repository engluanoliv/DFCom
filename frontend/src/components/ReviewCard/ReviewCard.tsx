import type { Review } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardAction, CardContent, CardHeader } from "../ui/card";
import { StarRating } from "../ui/star-rating";
import { Calendar, Edit, EllipsisVertical, Trash2 } from "lucide-react";
import { formatDateBR } from "@/utils/formatDate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";

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
      <Card className="w-[280px] h-[190px] justify-self-center">
        <CardHeader className="px-2 pt-2.5 pb-1">
          <div className="flex gap-4 items-center text-left">
            <Avatar className="rounded-full size-16 border border-gray-200">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>
                <Skeleton />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-between">
              <p className="font-semibold text-sm">{review.author}</p>
              <StarRating rating={review.rating} />
            </div>
          </div>
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:cursor-pointer">
                <EllipsisVertical className="h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="hover:cursor-pointer font-light py-2"
                  onClick={() => onEdit(review)}
                >
                  <Edit /> Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600 hover:cursor-pointer font-light py-2"
                  onClick={() => onDelete(review._id)}
                >
                  <Trash2 /> Remover
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </CardHeader>

        <CardContent className="flex flex-col w-full gap-4 flex-1">
          <div className="flex flex-col justify-between text-start gap-2 flex-1">
            <p className="text-sm capitalize line-clamp-3 flex-1">
              {review.comment}
            </p>
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
