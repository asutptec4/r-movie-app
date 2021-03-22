import PropTypes from 'prop-types';
import React from 'react';

import { selectOption } from '../../types/select-option';
import SingleSelectDropdown from '../SingleSelectDropdown/SingleSelectDropdown';
import './MovieListControl.scss';

const MovieListControl = ({ filterOptions, sortOptions, handleFilterChange, handleSortChange }) => {
  return (
    <div className="movie-list-controls ">
      <div className="filter-control">
        {filterOptions.map((g) => (
          <span className={g.selected ? 'active' : ''} key={g.id} onClick={() => handleFilterChange(g)}>
            {g.name}
          </span>
        ))}
      </div>

      <div className="sort-control">
        <label htmlFor="sort-selector">Sort by</label>
        <SingleSelectDropdown options={sortOptions} id="sort-selector" onOptionChange={handleSortChange} />
      </div>
    </div>
  );
};

MovieListControl.defaultProps = {
  filterOptions: [],
  sortOptions: [],
  handleFilterChange: () => {
    console.warn('MovieListControl handleFilterChange is not provided');
  },
  handleSortChange: () => {
    console.warn('MovieListControl handleSortChange is not provided');
  },
};

MovieListControl.propTypes = {
  filterOptions: PropTypes.arrayOf(selectOption),
  sortOptions: PropTypes.arrayOf(selectOption),
  handleFilterChange: PropTypes.func,
  handleSortChange: PropTypes.func,
};

export default MovieListControl;
