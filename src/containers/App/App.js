import React from 'react';

import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MovieListContainer from '../MovieListContainer/MovieListContainer';
import './App.scss';

const App = () => {
  return (
    <>
      <Header />
      <main className="content">
        <ErrorBoundary>
          <MovieListContainer />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
};

export default App;
