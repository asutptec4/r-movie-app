import { render, waitFor } from '@testing-library/react';
import React from 'react';
import 'regenerator-runtime/runtime';

import ErrorBoundary from './ErrorBoundary';

describe('<ErrorBoundary />', () => {
  const Component = jest.fn(() => null);
  const ComponentWithError = jest.fn(() => {
    throw new Error();
  });

  test('should render Component if there is no error', async () => {
    render(
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>,
    );
    await waitFor(() => expect(Component).toHaveBeenCalled());
  });

  test('should render skeleton if there is an error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ComponentWithError />
      </ErrorBoundary>,
    );
    expect(getByText('Oops! Something went wrong...')).toBeInTheDocument();
  });
});
