export const roundRating = (rating) => {
  return (Math.round(rating * 10) / 10).toFixed(1);
};

export const ratingToStr = (rating) => {
  if (rating < 4) {
    return 'bad';
  }
  if (rating > 7.5) {
    return 'good';
  }
  return 'norm';
};

export const getReleaseYear = (date) => {
  if (date) {
    return date.split('-').shift();
  }
  return '';
};
