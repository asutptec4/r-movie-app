import PropTypes from 'prop-types';
import React from 'react';

import MovieCard from '../MovieCard/MovieCard';
import MovieCounter from '../MovieCounter/MovieCounter';
import './MovieList.scss';

const MovieList = (props) => {
  return (
    <>
      <MovieCounter movieCount={props.movies.length} />
      <div className="movie-list">
        {props.movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(MovieCard.propTypes),
};

export default MovieList;
