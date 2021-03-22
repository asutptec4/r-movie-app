import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { selectOption } from '../../types/select-option';
import { useComponentDidUpdate } from '../../utils/custom-hooks';
import './SingleSelectDropdown.scss';

const getSelected = (options) => {
  if (options && options.length > 0) {
    return options.find((o) => o.selected);
  }
  return null;
};

const SingleSelectDropdown = ({ options, customButton, onOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(getSelected(options));

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    onOptionChange(value);
  };

  useComponentDidUpdate(() => {
    setSelectedOption(getSelected(options));
  }, [options]);

  return (
    <div className="single-select-dropdown-container">
      <div className="single-select-dropdown-button" onClick={toggling}>
        {customButton || (
          <>
            {selectedOption ? selectedOption.name : 'Select Option'}
            <span className="single-select-dropdown-arrow"></span>
          </>
        )}
      </div>

      {isOpen && (
        <div className="single-select-dropdown-list-container">
          <ul className="single-select-dropdown-list">
            {options.map((option) => (
              <li className="list-item" onClick={onOptionClicked(option)} key={option.id}>
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

SingleSelectDropdown.defaultProps = {
  onOptionChange: () => {
    console.warn('SingleSelectDropdown handler is not provided');
  },
};

SingleSelectDropdown.propTypes = {
  options: PropTypes.arrayOf(selectOption),
  onOptionChange: PropTypes.func,
  customButton: PropTypes.node,
};

export default SingleSelectDropdown;
