import React from 'react';
import renderer from 'react-test-renderer';

import Footer from './Footer';

describe('<Footer />', () => {
  const component = renderer.create(<Footer />);

  test('render', () => {
    expect(component).toMatchSnapshot();
  });
});
