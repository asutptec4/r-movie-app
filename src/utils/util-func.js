export const roundRating = (rating) => {
  return (Math.round(rating * 10) / 10).toFixed(1);
};

export const ratingToStr = (rating) => {
  if (rating < 2) {
    return 'bad';
  }
  if (rating > 4) {
    return 'good';
  }
  return 'norm';
};
