import { string } from 'prop-types';
import React, { useState } from 'react';

import Icon from '../../assets/image-not-found.png';
import './MoviePoster.scss';

const MoviePoster = ({ imageUrl }) => {
  const [image, setImage] = useState(imageUrl);
  return (
    <img
      src={image}
      alt="Movie poster"
      className="movie-image"
      onError={(e) => {
        setImage(Icon);
      }}
    ></img>
  );
};

MoviePoster.propTypes = {
  imageUrl: string,
};

export default MoviePoster;
