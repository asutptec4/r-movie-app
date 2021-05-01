import PropTypes from 'prop-types';

import { getReleaseYear, roundRating } from '../utils/util-func';

const { arrayOf, exact, number, string } = PropTypes;

export const movieType = exact({
  id: number,
  title: string,
  subtitle: string,
  poster: string,
  overview: string,
  genres: arrayOf(string),
  releaseDate: string,
  releaseYear: string,
  runtime: number,
  rating: string,
});

export const movieToJson = (movie) => ({
  id: movie.id,
  title: movie.title,
  release_date: movie.releaseDate,
  poster_path: movie.poster,
  genres: movie.genres,
  overview: movie.overview,
  runtime: Number(movie.runtime),
});

export const movieFromJson = (json) => ({
  id: json.id,
  title: json.title || '',
  subtitle: json.tagline || '',
  poster: json.poster_path || '',
  overview: json.overview || '',
  genres: json.genres || [],
  releaseDate: json.release_date || '',
  releaseYear: getReleaseYear(json.release_date) || '',
  runtime: json.runtime || 0,
  rating: roundRating(json.vote_average) || '',
});
