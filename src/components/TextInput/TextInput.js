import { useField } from 'formik';
import { string } from 'prop-types';
import React from 'react';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="app-form-label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input className="app-form-input" id={props.id || props.name} {...field} {...props} />
      {meta.touched && meta.error ? <div className="app-form-error">{meta.error}</div> : null}
    </>
  );
};

TextInput.propTypes = {
  label: string,
  id: string,
  name: string,
};

export default TextInput;
