import { render, screen } from '@testing-library/react';
import React from 'react';

import MoviePoster from './MoviePoster';

describe('<MoviePoster />', () => {
  const defaultProps = {
    imageUrl: 'https://image.tmdb.org/t/p/w500/432BowXw7a4fWXSONxBaFKqvW4f.jpg',
  };

  test('should render props', () => {
    render(<MoviePoster {...defaultProps} />);
    expect(screen.getByAltText(/movie poster/i)).toBeInTheDocument();
  });

  test('should render change url on update props', () => {
    const { rerender } = render(<MoviePoster {...defaultProps} />);
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w500/432BowXw7a4fWXSONxBaFKqvW4f.jpg',
    );
    rerender(<MoviePoster imageUrl={'https://new.image.service.com/12'} />);
    expect(screen.getByRole('img')).not.toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w500/432BowXw7a4fWXSONxBaFKqvW4f.jpg',
    );
  });
});
