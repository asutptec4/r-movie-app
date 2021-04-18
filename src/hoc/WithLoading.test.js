import { render, waitFor } from '@testing-library/react';
import React from 'react';
import 'regenerator-runtime/runtime';

import WithLoading from './WithLoading';

describe('<WithLoading />', () => {
  const mockComponent = jest.fn(() => null);
  const Component = WithLoading(mockComponent);

  test('should render component if not loading', async () => {
    render(<Component isLoading={false} />);
    await waitFor(() => {
      expect(mockComponent).toHaveBeenCalled();
    });
  });

  test('should render skeleton if loading', () => {
    const { getByText } = render(<Component isLoading={true} />);
    getByText('Loading...');
  });
});
