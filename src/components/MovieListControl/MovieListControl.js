import PropTypes from 'prop-types';
import React from 'react';

import { selectOption } from '../../types/select-option';
import { defaultHandler } from '../../utils/util-func';
import SingleSelectDropdown from '../SingleSelectDropdown/SingleSelectDropdown';
import styles from './MovieListControl.module.scss';

const MovieListControl = ({ filterOptions, sortOptions, handleFilterChange, handleSortChange }) => {
  return (
    <div className={styles.movieListControls}>
      <div className={styles.filterControl}>
        {filterOptions.map((g) => (
          <span className={g.selected ? `${styles.active}` : ''} key={g.id} onClick={() => handleFilterChange(g)}>
            {g.name}
          </span>
        ))}
      </div>

      <div className={styles.sortControl}>
        <label htmlFor={styles.sortSelector}>Sort by</label>
        <SingleSelectDropdown options={sortOptions} id="sort-selector" onOptionChange={handleSortChange} />
      </div>
    </div>
  );
};

MovieListControl.defaultProps = {
  filterOptions: [],
  sortOptions: [],
  handleFilterChange: defaultHandler,
  handleSortChange: defaultHandler,
};

MovieListControl.propTypes = {
  filterOptions: PropTypes.arrayOf(selectOption),
  sortOptions: PropTypes.arrayOf(selectOption),
  handleFilterChange: PropTypes.func,
  handleSortChange: PropTypes.func,
};

export default MovieListControl;
