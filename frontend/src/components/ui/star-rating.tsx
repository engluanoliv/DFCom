import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

type StarRatingProps = {
  className?: string;
  rating: number;
};

export const StarRating = ({ className, rating }: StarRatingProps) => {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[...Array(5)].map((_, index) => {
        const starFillPercentage =
          Math.min(Math.max(rating - index, 0), 1) * 100;

        return (
          <div
            key={index}
            className="relative flex items-center justify-center"
          >
            <Star className="size-4 fill-border stroke-border" />

            {starFillPercentage > 0 && (
              <Star
                className="absolute top-0 left-0 size-4 fill-yellow-300 stroke-yellow-300"
                style={{
                  clipPath: `inset(0 ${100 - starFillPercentage}% 0 0)`,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
