import PropTypes from 'prop-types';

const { exact, bool, string } = PropTypes;

export const selectOption = exact({
  id: string,
  name: string.isRequired,
  selected: bool,
});
