import PropTypes from 'prop-types';
import React from 'react';

const MovieCounter = (props) => {
  return <div className="c-p-v-15">{props.movieCount} movies found</div>;
};

MovieCounter.defaultProps = {
  movieCount: 0,
};

MovieCounter.propTypes = {
  movieCount: PropTypes.number,
};

export default MovieCounter;
