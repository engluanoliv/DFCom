import type { Review } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { StarRating } from "../ui/star-rating";

type ReviewCardProps = {
  review: Review;
};

export default function ReviewCard({ review }: ReviewCardProps): JSX.Element {
  const DICEBEAR_URL = import.meta.env.VITE_DICEBEAR_URL;
  const randomSeed = Math.random().toString(36).substring(2, 10);
  const avatarUrl = `${DICEBEAR_URL}?seed=${randomSeed}`;
  return (
    <>
      <Card className="max-w-[320px]">
        <CardContent className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <Avatar>
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>{review.author}</AvatarFallback>
            </Avatar>
            <StarRating rating={review.rating} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
