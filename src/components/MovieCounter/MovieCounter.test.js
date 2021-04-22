import React from 'react';
import renderer from 'react-test-renderer';

import MovieCounter from './MovieCounter';

describe('<MovieCounter />', () => {
  const props = { movieCount: 10 };
  const component = renderer.create(<MovieCounter {...props} />);

  test('should render props', () => {
    expect(component).toMatchSnapshot();
  });
});
