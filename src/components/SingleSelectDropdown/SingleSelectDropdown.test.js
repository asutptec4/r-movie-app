import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import SingleSelectDropdown from './SingleSelectDropdown';

describe('<SingleSelectDropdown />', () => {
  const onOptionChange = jest.fn();

  test('should render props', () => {
    const props = {
      options: [
        { id: 'option1', name: 'option1' },
        { id: 'option2', name: 'option2' },
      ],
      onOptionChange,
    };
    const { container } = render(<SingleSelectDropdown {...props} />);
    expect(screen.getByText('Select Option')).toBeInTheDocument();
    expect(container.querySelector('ul')).not.toBeInTheDocument();
  });

  test('should render custom button', () => {
    const CustomButton = () => <div>Custom button</div>;
    const props = {
      customButton: <CustomButton />,
      onOptionChange,
    };
    render(<SingleSelectDropdown {...props} />);
    expect(screen.getByText('Custom button')).toBeInTheDocument();
  });

  test('should show selected option', () => {
    const props = {
      options: [
        { id: 'option1', name: 'option1' },
        { id: 'option2', name: 'option2', selected: true },
      ],
      onOptionChange,
    };
    render(<SingleSelectDropdown {...props} />);
    expect(screen.getByText('option2')).toBeInTheDocument();
  });

  test('should open option list on click', () => {
    const props = {
      options: [
        { id: 'option1', name: 'option1' },
        { id: 'option2', name: 'option2' },
      ],
      onOptionChange,
    };
    const { container } = render(<SingleSelectDropdown {...props} />);
    fireEvent.click(screen.getByText('Select Option'));
    expect(container.querySelector('ul')).toBeInTheDocument();
    expect(container.querySelectorAll('li')).toHaveLength(2);
  });

  test('should change selected option by props changing', () => {
    let props = {
      options: [
        { id: 'option1', name: 'option1', selected: true },
        { id: 'option2', name: 'option2' },
      ],
      onOptionChange,
    };
    const { rerender } = render(<SingleSelectDropdown {...props} />);
    expect(screen.getByText('option1')).toBeInTheDocument();
    props = {
      options: [
        { id: 'option1', name: 'option1' },
        { id: 'option2', name: 'option2', selected: true },
      ],
      onOptionChange,
    };
    rerender(<SingleSelectDropdown {...props} />);
    expect(screen.queryByText('option1')).not.toBeInTheDocument();
    expect(screen.getByText('option2')).toBeInTheDocument();
  });

  test('should invoke onOptionChange on option click', () => {
    const props = {
      options: [
        { id: 'option1', name: 'option1' },
        { id: 'option2', name: 'option2' },
      ],
      onOptionChange,
    };
    render(<SingleSelectDropdown {...props} />);
    fireEvent.click(screen.getByText('Select Option'));
    fireEvent.click(screen.getByText('option1'));
    expect(onOptionChange).toHaveBeenCalledWith({ id: 'option1', name: 'option1' });
  });
});
