import { render } from '@testing-library/react';
import { useField } from 'formik';
import React from 'react';

import TextInput from './TextInput';

jest.mock('formik');

describe('<TextInput />', () => {
  const defaultProps = { label: 'TextInputLabel' };

  test('should render props', () => {
    useField.mockReturnValue([{}, {}]);
    const { container } = render(<TextInput {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  test('should show error message igf touched', () => {
    const errorText = 'input error';
    useField.mockReturnValue([{}, { touched: true, error: errorText }]);
    const { getByText } = render(<TextInput {...defaultProps} />);
    getByText(errorText);
  });
});
