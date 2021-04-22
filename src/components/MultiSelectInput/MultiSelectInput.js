import { useField } from 'formik';
import { arrayOf, string } from 'prop-types';
import React from 'react';

import { useComponentDidUpdate, useToggle } from '../../utils/custom-hooks';
import Checkbox from '../Checkbox/Checkbox';
import './MultiSelectInput.scss';

const MultiSelectInput = ({ availableOptions = [], placeholder, label, ...props }) => {
  const [showList, toggleShowList] = useToggle();
  const [, meta, helper] = useField(props);

  const handleOptionOnChange = (state, label) => {
    let selectedValues = [...meta.value];
    if (state) {
      selectedValues.push(label);
    } else {
      selectedValues = selectedValues.filter((v) => v !== label);
    }
    helper.setValue(selectedValues);
  };

  useComponentDidUpdate(() => {
    if (!showList) {
      helper.setTouched(true, true);
    }
  }, [showList]);

  return (
    <>
      <label className="app-form-label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <div className="multi-select-input">
        <button onClick={toggleShowList} className="button" type="button">
          {meta.value.join(', ') || placeholder || 'Select'}
        </button>
        {showList && (
          <div className="select-options">
            {availableOptions.map((option) => (
              <Checkbox
                className="option"
                key={option}
                label={option}
                initialState={meta.value.some((o) => o === option)}
                handleOnChange={(state) => handleOptionOnChange(state, option)}
              />
            ))}
          </div>
        )}
      </div>
      {meta.touched && meta.error ? <div className="app-form-error">{meta.error}</div> : null}
    </>
  );
};

MultiSelectInput.propTypes = {
  availableOptions: arrayOf(string),
  placeholder: string,
  label: string,
  id: string,
  name: string,
};

export default MultiSelectInput;
