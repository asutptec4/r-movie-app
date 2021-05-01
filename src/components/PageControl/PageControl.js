import { number, func } from 'prop-types';
import React from 'react';

import { calcLastPage, defaultHandler } from '../../utils/util-func';
import styles from './PageControl.module.scss';

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
    return isDisabled ? `${styles.disabled}` : '';
  };

  const isShowPageControl = totalItemCount > itemPerPage;

  return (
    <>
      {isShowPageControl && (
        <div className={styles.pageControl}>
          <span className={`${styles.pageControlButton} ${setDisabledState(currentPage === 1)}`} onClick={getPrevPage}>
            Prev page
          </span>
          <span className={styles.pageControlButton}>{currentPage}</span>
          <span
            className={`${styles.pageControlButton} ${setDisabledState(
              currentPage === calcLastPage(totalItemCount, itemPerPage),
            )}`}
            onClick={getNextPage}
          >
            Next page
          </span>
        </div>
      )}
    </>
  );
};

PageControl.defaultProps = {
  currentPage: 1,
  itemPerPage: 1,
  totalItemCount: 1,
  handlePageChange: defaultHandler,
};

PageControl.propTypes = {
  currentPage: number,
  itemPerPage: number,
  totalItemCount: number,
  handlePageChange: func,
};

export default PageControl;
