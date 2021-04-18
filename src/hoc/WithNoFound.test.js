import { render } from '@testing-library/react';
import React from 'react';

import WithNoFound from './WithNoFound';

describe('<WithNoFound />', () => {
  const mockComponent = jest.fn(() => null);
  const Component = WithNoFound(mockComponent);

  test('should render Component if movieCount is more than 0', () => {
    render(<Component movieCount={10} />);
    expect(mockComponent).toHaveBeenCalled();
  });

  test('should render No Movie Found if movieCount is 0', () => {
    const { getByText } = render(<Component movieCount={0} />);
    expect(getByText('No Movie Found')).toBeInTheDocument();
  });
});
