import React from 'react';

import MovieList from './MovieList';

export default {
  title: 'MovieApp/MovieList',
  component: MovieList,
  parameters: { actions: { argTypesRegex: '^handle.*' } },
};

const Template = (args) => <MovieList {...args} />;

export const Base = Template.bind({});
const cardNumber = 7;
const movie = {
  genres: ['Science Fiction', 'Action', 'Adventure'],
  id: 424785,
  overview: 'Plot unknown.',
  poster: 'https://image.tmdb.org/t/p/w500/432BowXw7a4fWXSONxBaFKqvW4f.jpg',
  rating: '8.0',
  releaseDate: '2019-06-26',
  releaseYear: '2019',
  runtime: 120,
  subtitle: '',
  title: 'Transformers 7',
};
Base.args = {
  movies: Array(cardNumber).fill(movie),
  foundMoviesCount: 7,
};
