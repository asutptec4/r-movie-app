import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { Greeting } from './Greeting';

describe('Input component', () => {
  afterEach(cleanup);

  it('Greeting render props', () => {
    const name = 'React';
    const { container } = render(<Greeting name={name} />);
    expect(container).toMatchSnapshot();
  });
});
