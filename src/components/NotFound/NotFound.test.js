import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import NotFound from './NotFound';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));

describe('<NotFound />', () => {
  test('should render component', () => {
    const { getByRole } = render(<NotFound />);
    expect(getByRole('button')).toBeInTheDocument();
  });

  test('should navigate to / by button click', () => {
    const { getByRole } = render(<NotFound />);
    userEvent.click(getByRole('button'));
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
