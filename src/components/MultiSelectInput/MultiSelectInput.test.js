import { fireEvent, render, screen } from '@testing-library/react';
import { useField } from 'formik';
import React from 'react';

import MultiSelectInput from './MultiSelectInput';

jest.mock('formik');

describe('<MultiSelectInput />', () => {
  const defaultProps = {
    label: 'MultiSelectInputLabel',
    availableOptions: ['option1', 'option2'],
    placeholder: 'Select Options',
  };

  test('should render props', () => {
    useField.mockReturnValue([{}, { value: [] }]);
    render(<MultiSelectInput {...defaultProps} />);
    expect(screen.getByText('MultiSelectInputLabel')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Select Options');
  });

  test('should render default button label', () => {
    useField.mockReturnValue([{}, { value: [] }]);
    render(<MultiSelectInput />);
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  test('should render show selected option on button', () => {
    useField.mockReturnValue([{}, { value: ['option1', 'option2'] }]);
    render(<MultiSelectInput {...defaultProps} />);
    expect(screen.getByText('option1, option2')).toBeInTheDocument();
  });

  test('should show error message if touched&error', () => {
    const errorText = 'input error';
    useField.mockReturnValue([{}, { value: [], touched: true, error: errorText }]);
    render(<MultiSelectInput {...defaultProps} />);
    expect(screen.getByText(errorText)).toBeInTheDocument();
  });

  test('should show option list if click on button', () => {
    useField.mockReturnValue([{}, { value: [] }]);
    render(<MultiSelectInput {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getAllByRole('checkbox', { checked: false })).toHaveLength(2);
  });

  test('should setTouched after close option list', () => {
    const setTouchedMock = jest.fn();
    useField.mockReturnValue([{}, { value: [] }, { setTouched: setTouchedMock }]);
    render(<MultiSelectInput {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));
    expect(setTouchedMock).toHaveBeenCalledWith(true, true);
  });

  test('should set selected option by checkbox click', () => {
    const setValueMock = jest.fn();
    useField.mockReturnValue([{}, { value: [] }, { setValue: setValueMock }]);
    render(<MultiSelectInput {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('checkbox', { name: 'option1' }));
    expect(setValueMock).toHaveBeenCalledWith(['option1']);
  });

  test('should unset selected option by checkbox click', () => {
    const setValueMock = jest.fn();
    useField.mockReturnValue([{}, { value: ['option1'] }, { setValue: setValueMock }]);
    render(<MultiSelectInput {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('checkbox', { name: 'option1' }));
    expect(setValueMock).toHaveBeenCalledWith([]);
  });
});
