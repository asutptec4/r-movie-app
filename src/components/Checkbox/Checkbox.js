import { bool, func, string } from 'prop-types';
import React from 'react';

import { useComponentDidUpdate, useToggle } from '../../utils/custom-hooks';
import { defaultHandler } from '../../utils/util-func';

import './Checkbox.scss';

const Checkbox = ({ label, initialState, handleOnChange, className }) => {
  const [isChecked, toggle] = useToggle(initialState);

  useComponentDidUpdate(() => {
    handleOnChange(isChecked);
  }, [isChecked]);

  return (
    <label className={`checkbox ${className}`.trim()}>
      {label}
      <input type="checkbox" checked={isChecked} onChange={toggle} />
      <span className="checkmark"></span>
    </label>
  );
};

Checkbox.defaultProps = {
  className: '',
  initialState: false,
  handleOnChange: defaultHandler,
};

Checkbox.propTypes = {
  label: string,
  className: string,
  initialState: bool,
  handleOnChange: func,
};

export default Checkbox;
