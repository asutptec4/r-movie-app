import PropTypes from 'prop-types';

const { arrayOf, exact, number, string } = PropTypes;

export const movie = exact({
  id: string,
  title: string,
  genres: arrayOf(string),
  releaseYear: number,
});
