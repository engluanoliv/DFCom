export type RatingSummary = { rating: number; count: number }[];

export function calculateRatingSummary(ratingSummary: RatingSummary) {
  const ratingCounts: { [key: number]: number } = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  for (const { rating, count } of ratingSummary) {
    ratingCounts[rating] = count;
  }

  const totalReviews = Object.values(ratingCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  const averageRating = totalReviews
    ? Object.entries(ratingCounts).reduce((sum, [stars, count]) => {
        return sum + Number(stars) * count;
      }, 0) / totalReviews
    : 0;

  return {
    data: Object.entries(ratingCounts).map(([stars, count]) => ({
      name: stars,
      value: count,
      percentage: totalReviews ? (count / totalReviews) * 100 : 0,
    })),
    averageRating: Math.round(averageRating * 100) / 100,
  };
}
