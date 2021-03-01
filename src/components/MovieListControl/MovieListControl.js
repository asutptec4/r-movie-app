import PropTypes from 'prop-types';
import React from 'react';

import SelectOption from '../../utils/SelectOption';
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

MovieListControl.propTypes = {
  filterOptions: PropTypes.arrayOf(SelectOption.propTypes),
  sortOptions: PropTypes.arrayOf(SelectOption.propTypes),
};

export default MovieListControl;
