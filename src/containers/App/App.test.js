import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './App';

describe('<App />', () => {
  test('should render', () => {
    render(<App />);
    expect(screen.getAllByText('NetflixRoulette')).toHaveLength(2);
  });
});
