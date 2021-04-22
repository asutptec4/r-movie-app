import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import PageControl from './PageControl';

describe('<PageControl />', () => {
  const handlePageChange = jest.fn();
  const defaultProps = {
    currentPage: 1,
    itemPerPage: 15,
    totalItemCount: 35,
    handlePageChange,
  };

  test('should render', () => {
    render(<PageControl {...defaultProps} />);
    expect(screen.getByText(/prev/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/prev/i)).toHaveClass('disabled');
  });

  test('should be hidden if just one page', () => {
    const props = {
      currentPage: 1,
      itemPerPage: 15,
      totalItemCount: 10,
      handlePageChange,
    };
    render(<PageControl {...props} />);
    expect(screen.queryByText(/prev/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/next/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/1/i)).not.toBeInTheDocument();
  });

  test('should invoke handlePageChange on next page', () => {
    render(<PageControl {...defaultProps} />);
    fireEvent.click(screen.getByText(/next/i));
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  test('should not invoke handlePageChange on prev page if current is 1', () => {
    render(<PageControl {...defaultProps} />);
    fireEvent.click(screen.getByText(/prev/i));
    expect(handlePageChange).not.toHaveBeenCalledWith(2);
  });

  test('should not invoke handlePageChange on next page if current is last', () => {
    const props = {
      currentPage: 2,
      itemPerPage: 15,
      totalItemCount: 25,
      handlePageChange,
    };
    render(<PageControl {...props} />);
    fireEvent.click(screen.getByText(/next/i));
    expect(handlePageChange).not.toHaveBeenCalledWith(2);
  });

  test('should invoke handlePageChange on prev page', () => {
    const props = {
      currentPage: 2,
      itemPerPage: 15,
      totalItemCount: 25,
      handlePageChange,
    };
    render(<PageControl {...props} />);
    fireEvent.click(screen.getByText(/prev/i));
    expect(handlePageChange).toHaveBeenCalledWith(1);
  });
});
