import React, { useState } from 'react';

import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MovieListContainer from '../MovieListContainer/MovieListContainer';
import './App.scss';

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <>
      <Header selectedMovie={selectedMovie} />
      <main className="content">
        <ErrorBoundary>
          <MovieListContainer setSelectedMovie={setSelectedMovie} />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
};

export default App;
