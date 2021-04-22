import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import MovieCard from './MovieCard';

jest.mock('../MoviePoster/MoviePoster', () => 'MoviePosterComponent');

describe('<MovieCard />', () => {
  const mockCardActionHandler = jest.fn();
  const mockCardClickHandler = jest.fn();
  const defaultProps = {
    movie: {
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
    handleCardAction: mockCardActionHandler,
    handleCardClick: mockCardClickHandler,
  };

  test('should render movie prop', () => {
    const { container } = render(<MovieCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  test('should invoke handleCardClick on image click', () => {
    const { container } = render(<MovieCard {...defaultProps} />);
    fireEvent.click(container.firstChild.firstChild);
    expect(mockCardClickHandler).toHaveBeenCalledWith(defaultProps.movie);
  });

  test('should print empty string if genres are not provided', () => {
    defaultProps.movie.genres = undefined;
    const { container } = render(<MovieCard {...defaultProps} />);
    const genre = container.getElementsByClassName('genre')[0];
    expect(genre.innerHTML).toEqual('');
  });
});
