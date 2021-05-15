import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import MovieDescription from './MovieDescription';

jest.mock('../MoviePoster/MoviePoster', () => 'MoviePosterComponent');

describe('<MovieDescription />', () => {
  const closeButtonHandler = jest.fn();
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
    closeButtonHandler,
  };

  test('should render movie description', () => {
    const { container } = render(<MovieDescription {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  test('should invoke closeButtonHandler on glass icon click', () => {
    const { container } = render(<MovieDescription {...defaultProps} />);
    fireEvent.click(container.firstChild.firstChild.firstChild);
    expect(closeButtonHandler).toHaveBeenCalled();
  });
});
