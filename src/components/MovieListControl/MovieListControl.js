import PropTypes from 'prop-types';
import React from 'react';

import { selectOption } from '../../types/select-option';
import Dropdown from '../Dropdown/Dropdown';
import './MovieListControl.scss';

const MovieListControl = ({ filterOptions, sortOptions }) => {
  return (
    <div className="movie-list-controls ">
      <div className="filter-control">
        {filterOptions.map((g) => (
          <span className={g.selected ? 'active' : ''} key={g.id}>
            {g.name}
          </span>
        ))}
      </div>

      <div className="sort-control">
        <label htmlFor="sort-selector">Sort by</label>
        <Dropdown options={sortOptions} id="sort-selector" />
      </div>
    </div>
  );
};

MovieListControl.defaultProps = {
  filterOptions: [],
};

MovieListControl.propTypes = {
  filterOptions: PropTypes.arrayOf(selectOption),
  sortOptions: PropTypes.arrayOf(selectOption).isRequired,
};

export default MovieListControl;
