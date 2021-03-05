import PropTypes from 'prop-types';

const { exact, string } = PropTypes;

export const movieAction = exact({
  id: string.isRequired,
  name: string.isRequired,
});
