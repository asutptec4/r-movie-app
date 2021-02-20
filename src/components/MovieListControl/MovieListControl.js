import PropTypes from 'prop-types';
import React from 'react';

import SelectOption from '../../utils/SelectOption';
import Dropdown from '../Dropdown/Dropdown';
import './MovieListControl.scss';

const MovieListControl = (props) => {
  return (
    <div className="movie-list-controls ">
      <div className="filter-control">
        {props.filterOptions.map((g) => (
          <span className={g.selected ? 'active' : ''} key={g.id}>
            {g.name}
          </span>
        ))}
      </div>

      <div className="sort-control">
        <label htmlFor="sort-selector">Sort by</label>
        <Dropdown options={props.sortOptions} id="sort-selector" />
      </div>
    </div>
  );
};

MovieListControl.propTypes = {
  filterOptions: PropTypes.arrayOf(SelectOption),
  sortOptions: PropTypes.arrayOf(SelectOption),
};

export default MovieListControl;
