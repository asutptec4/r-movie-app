import PropTypes from 'prop-types';
import React from 'react';

const MovieCounter = ({ movieCount }) => {
  return <div className="app-padding-vertical-15">{movieCount} movies found</div>;
};

MovieCounter.defaultProps = {
  movieCount: 0,
};

MovieCounter.propTypes = {
  movieCount: PropTypes.number,
};

export default MovieCounter;
