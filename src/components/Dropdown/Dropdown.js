import PropTypes from 'prop-types';
import React, { useState } from 'react';

import SelectOption from '../../utils/SelectOption';
import './Dropdown.scss';

const Dropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const defaultTitle = selectedOption.name || (options && options.length > 0 ? options[0].name : 'Select Option');

  return (
    <div className="dropdown-container">
      <div className="dropdown-button" onClick={toggling}>
        {defaultTitle}
        <span className="dropdown-arrow"></span>
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

Dropdown.propTypes = {
  options: PropTypes.arrayOf(SelectOption.propTypes),
};

export default Dropdown;
