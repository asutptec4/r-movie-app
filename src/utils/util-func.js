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

export const updateOptions = (options, selectedId) => {
  const newOptions = [];
  for (let i = 0; i < options.length; i++) {
    const element = options[i];
    element.selected = element.id === selectedId;
    newOptions.push(element);
  }
  return newOptions;
};

export const calcLastPage = (totalCount, countPerPage) => {
  let pageCount = Math.floor(totalCount / countPerPage);
  if (totalCount % countPerPage !== 0) {
    pageCount++;
  }
  return pageCount;
};
