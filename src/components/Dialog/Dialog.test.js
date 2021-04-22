import { render } from '@testing-library/react';
import React from 'react';

import Dialog from './Dialog';

const TestChildComponent = () => <div>Child component</div>;

describe('<Dialog />', () => {
  test('should render children', () => {
    const { container } = render(
      <Dialog handleClose={jest.fn()}>
        <TestChildComponent />,
      </Dialog>,
    );
    expect(container).toMatchSnapshot();
  });
});
