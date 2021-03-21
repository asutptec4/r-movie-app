import React from 'react';
import { Provider } from 'react-redux';

import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import store from '../../store/store';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MovieListContainer from '../MovieListContainer/MovieListContainer';
import './App.scss';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <main className="content">
        <ErrorBoundary>
          <MovieListContainer />
        </ErrorBoundary>
      </main>
      <Footer />
    </Provider>
  );
};

export default App;
