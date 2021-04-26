import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { selectOption } from '../../types/select-option';
import { useComponentDidUpdate } from '../../utils/custom-hooks';
import { defaultHandler } from '../../utils/util-func';
import styles from './SingleSelectDropdown.module.scss';

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
    <div className={styles.singleSelectDropdownContainer}>
      <div className={styles.singleSelectDropdownButton} onClick={toggling}>
        {customButton || (
          <>
            {selectedOption ? selectedOption.name : 'Select Option'}
            <span className={styles.singleSelectDropdownArrow}></span>
          </>
        )}
      </div>

      {isOpen && (
        <div className={styles.singleSelectDropdownListContainer}>
          <ul className={styles.singleSelectDropdownList}>
            {options.map((option) => (
              <li className={styles.listItem} onClick={onOptionClicked(option)} key={option.id}>
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
  onOptionChange: defaultHandler,
};

SingleSelectDropdown.propTypes = {
  options: PropTypes.arrayOf(selectOption),
  onOptionChange: PropTypes.func,
  customButton: PropTypes.node,
};

export default SingleSelectDropdown;
