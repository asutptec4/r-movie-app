import { useRouter } from 'next/router';
import React from 'react';

import styles from '../components/NotFound/NotFound.module.scss';

const NotFound = () => {
  const history = useRouter();

  const handleClick = () => {
    history.push('/');
  };

  return (
    <div className={styles.notFoundContainer}>
      <img src="/page-not-found.png" alt="Page not found" className={styles.image}></img>
      <button className={styles.returnButton} onClick={handleClick}>
        Go back to home
      </button>
    </div>
  );
};

export default NotFound;
