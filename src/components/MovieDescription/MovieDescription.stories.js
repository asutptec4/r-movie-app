import React from 'react';

import MovieDescription from './MovieDescription';

export default {
  title: 'MovieApp/MovieDescription',
  component: MovieDescription,
  parameters: { actions: { argTypesRegex: '^close.*' } },
};

const Template = (args) => <MovieDescription {...args} />;

export const Base = Template.bind({});
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
  movie,
};
