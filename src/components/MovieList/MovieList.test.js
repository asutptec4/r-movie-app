import { render } from '@testing-library/react';
import React from 'react';

import MovieList from './MovieList';

jest.mock('../MoviePoster/MoviePoster', () => 'MoviePosterComponent');

describe('<MovieList />', () => {
  const defaultProps = {
    movies: [
      {
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
      },
    ],
    foundMoviesCount: 1,
    handleCardAction: jest.fn(),
    handleCardClick: jest.fn(),
  };

  test('should render', () => {
    const { container } = render(<MovieList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
