import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { selectOption } from '../../types/select-option';
import './Dropdown.scss';

const getSelected = (options) => {
  if (options && options.length > 0) {
    return options.find((o) => o.selected);
  }
  return null;
};

const Dropdown = ({ options, customButton, onOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(getSelected(options));

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    onOptionChange(value);
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-button" onClick={toggling}>
        {customButton || (
          <>
            {selectedOption ? selectedOption.name : 'Select Option'}
            <span className="dropdown-arrow"></span>
          </>
        )}
      </div>

      {isOpen && (
        <div className="dropdown-list-container">
          <ul className="dropdown-list">
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

Dropdown.defaultProps = {
  onOptionChange: () => {
    console.warn('handler is not provided');
  },
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(selectOption),
  onOptionChange: PropTypes.func,
  customButton: PropTypes.node,
};

export default Dropdown;
