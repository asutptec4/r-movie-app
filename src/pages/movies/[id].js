import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import { MovieApi } from '../../api/api';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import MovieDescription from '../../components/MovieDescription/MovieDescription';
import MovieListContainer from '../../components/next/MovieListContainer';
import { MOVIES_PATH } from '../../constant';
import { movieType, movieFromJson } from '../../types';

const Movies = ({ movie }) => {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.push(MOVIES_PATH);
  }, []);

  return (
    <>
      <MovieDescription movie={movie} closeButtonHandler={handleClose} />
      <main>
        <div className="content">
          <ErrorBoundary>
            <MovieListContainer />
            <div></div>
          </ErrorBoundary>
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const res = await MovieApi.getById(params.id);
    const movie = movieFromJson(res.data);
    return {
      props: {
        movie,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}

Movies.propTypes = { movie: movieType };

export default Movies;
