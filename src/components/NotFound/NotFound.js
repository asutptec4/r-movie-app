import React from 'react';
import { useHistory } from 'react-router-dom';

import Icon from '../../assets/page-not-found.png';
import './NotFound.scss';

const NotFound = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };

  return (
    <div className="not-found-container">
      <img src={Icon} alt="Page not found" className="image"></img>
      <button className="return-button" onClick={handleClick}>
        Go back to home
      </button>
    </div>
  );
};

export default NotFound;
