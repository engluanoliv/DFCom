import { calculateRatingSummary } from "@/utils/calculateRatingSummary";
import { useEffect, useMemo } from "react";
import { Star } from "lucide-react";

type RatingRankingProps = {
  ratingSummary?: { rating: number; count: number }[];
  onAverageRatingChange?: (averageRating: number) => void;
};

export default function RatingRanking({
  ratingSummary,
  onAverageRatingChange,
}: RatingRankingProps): JSX.Element {
  const ratingData = useMemo(
    () => calculateRatingSummary(ratingSummary ?? []),
    [ratingSummary]
  );

  useEffect(() => {
    if (onAverageRatingChange) {
      onAverageRatingChange(ratingData.averageRating);
    }
  }, [ratingData.averageRating, onAverageRatingChange]);

  return (
    <>
      <div className="flex flex-col justify-start">
        {ratingData.data.map((rating, index) => (
          <div
            className="flex w-full items-center gap-2 text-sm"
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
          >
            <p className="w-2 shrink-0 text-center font-medium leading-none">
              {rating.name}
            </p>
            <Star className="size-4 shrink-0 fill-yellow-300 stroke-yellow-300" />
            <div className="h-2 w-44 shrink-0 rounded-full bg-border sm:w-56">
              <div
                className="h-2 rounded-full bg-yellow-300"
                style={{ width: `${rating.percentage}%` }}
              />
            </div>
            <p className="w-full whitespace-nowrap">
              {rating.value} avaliações
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
