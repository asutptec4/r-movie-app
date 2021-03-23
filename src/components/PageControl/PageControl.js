import { number, func } from 'prop-types';
import React from 'react';

import { calcLastPage } from '../../utils/util-func';

import './PageControl.scss';

const PageControl = ({ currentPage, itemPerPage, totalItemCount, handlePageChange }) => {
  const getPrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const getNextPage = () => {
    if (currentPage < calcLastPage(totalItemCount, itemPerPage)) {
      handlePageChange(currentPage + 1);
    }
  };

  const setDisabledState = (isDisabled) => {
    return isDisabled ? 'disabled' : '';
  };

  return (
    <div className="page-control">
      <span className={`page-control-button ${setDisabledState(currentPage === 1)}`} onClick={getPrevPage}>
        Prev page
      </span>
      <span className="page-control-button">{currentPage}</span>
      <span
        className={`page-control-button ${setDisabledState(currentPage === calcLastPage(totalItemCount, itemPerPage))}`}
        onClick={getNextPage}
      >
        Next page
      </span>
    </div>
  );
};

PageControl.defaultProps = {
  currentPage: 1,
  itemPerPage: 1,
  totalItemCount: 1,
  handlePageChange: () => {
    console.warn('PageControl handleSortChange is not provided');
  },
};

PageControl.propTypes = {
  currentPage: number,
  itemPerPage: number,
  totalItemCount: number,
  handlePageChange: func,
};

export default PageControl;
