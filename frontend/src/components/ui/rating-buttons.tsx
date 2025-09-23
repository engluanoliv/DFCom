import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

type RatingButtonProps = {
  rating: number;
  onRatingChange: (newRating: number) => void;
};

export default function RatingButton({
  rating,
  onRatingChange,
}: RatingButtonProps): JSX.Element {
  return (
    <div className="flex items-center justify-center space-x-0.5">
      {new Array(5).fill("").map((_, index) => (
        <button
          key={index}
          onClick={() => onRatingChange(index + 1)}
          type="button"
        >
          <Star
            className={cn(
              "size-8 transition-all hover:scale-125",
              rating >= index + 1
                ? "fill-yellow-300 stroke-yellow-300"
                : "fill-border stroke-border"
            )}
          />
        </button>
      ))}
    </div>
  );
}
