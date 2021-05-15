import { string } from 'prop-types';
import React, { useState } from 'react';

import Icon from '../../assets/image-not-found.png';
import { useComponentDidUpdate } from '../../utils/custom-hooks';
import styles from './MoviePoster.module.scss';

const MoviePoster = ({ imageUrl }) => {
  const [image, setImage] = useState(imageUrl);

  useComponentDidUpdate(() => {
    setImage(imageUrl);
  }, [imageUrl]);

  return (
    <img
      src={image}
      alt="Movie poster"
      className={styles.moviePoster}
      onError={() => {
        setImage(Icon);
      }}
    ></img>
  );
};

MoviePoster.propTypes = {
  imageUrl: string,
};

export default MoviePoster;
