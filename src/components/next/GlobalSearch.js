import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { SEARCH_PATH } from '../../constant';
import { selectSearchText } from '../../reducers/moviesSlice';
import styles from '../GlobalSearch/GlobalSearch.module.scss';

const GlobalSearch = () => {
  const searchInput = useRef(null);

  const searchText = useSelector(selectSearchText);

  const history = useRouter();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const searchText = searchInput.current.value;
    history.push(`${SEARCH_PATH}/${searchText}`);
  };

  useEffect(() => {
    searchInput.current.value = searchText;
  }, [searchText]);

  return (
    <div className={styles.globalSearch}>
      <span className={styles.title}>Find your movie</span>
      <input
        className={styles.input}
        placeholder="What do you want to search?"
        ref={searchInput}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.button} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default GlobalSearch;
