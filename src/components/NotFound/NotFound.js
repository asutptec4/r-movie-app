import React from 'react';
import { useHistory } from 'react-router-dom';

import Icon from '../../assets/page-not-found.png';
import styles from './NotFound.module.scss';

const NotFound = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };

  return (
    <div className={styles.notFoundContainer}>
      <img src={Icon} alt="Page not found" className={styles.image}></img>
      <button className={styles.returnButton} onClick={handleClick}>
        Go back to home
      </button>
    </div>
  );
};

export default NotFound;
