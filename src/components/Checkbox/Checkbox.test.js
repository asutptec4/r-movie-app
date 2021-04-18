import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import Checkbox from './Checkbox';

describe('<Checkbox />', () => {
  const mockHandler = jest.fn();
  const defaultProps = { label: 'Checkbox', initialState: true, className: 'customClass', handleOnChange: mockHandler };

  test('should render props', () => {
    const { container } = render(<Checkbox {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  test('should change state by click and invoke handler', () => {
    const { getByLabelText } = render(<Checkbox {...defaultProps} />);
    const input = getByLabelText(defaultProps.label);
    expect(input.checked).toBeTruthy();
    fireEvent.click(input);
    expect(input.checked).toBeFalsy();
    expect(mockHandler).toHaveBeenCalledWith(false);
  });
});
