import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import MovieListControl from './MovieListControl';

describe('<MovieListControl />', () => {
  const handleFilterChange = jest.fn();
  const handleSortChange = jest.fn();
  const defaultProps = {
    filterOptions: [
      { id: 'filter1', name: 'filter1', selected: true },
      { id: 'filter2', name: 'filter2' },
    ],
    sortOptions: [
      { id: 'sort1', name: 'sort1' },
      { id: 'sort1', name: 'sort1' },
    ],
    handleFilterChange,
    handleSortChange,
  };

  test('should render', () => {
    render(<MovieListControl {...defaultProps} />);
    expect(screen.getByText('filter1')).toBeInTheDocument();
    expect(screen.getByText('filter2')).toBeInTheDocument();
    expect(screen.getByText('filter1')).toHaveClass('active');
  });

  test('should invoke handleFilterChange if click on filter', () => {
    render(<MovieListControl {...defaultProps} />);
    fireEvent.click(screen.getByText('filter2'));
    expect(handleFilterChange).toHaveBeenCalled();
  });
});
