import { render } from '@testing-library/react';
import React from 'react';

import WithLoading from './WithLoading';

describe('<WithLoading />', () => {
  const mockComponent = jest.fn(() => null);
  const Component = WithLoading(mockComponent);

  test('should render component if not loading', () => {
    render(<Component isLoading={false} />);
    expect(mockComponent).toHaveBeenCalled();
  });

  test('should render skeleton if loading', () => {
    const { getByText } = render(<Component isLoading={true} />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });
});
