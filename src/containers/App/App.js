import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import NotFound from '../../components/NotFound/NotFound';
import store from '../../store/store';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MovieListContainer from '../MovieListContainer/MovieListContainer';
import './App.scss';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path={['/movies', '/search']}>
            <Header />
            <main>
              <div className="content">
                <ErrorBoundary>
                  <MovieListContainer />
                </ErrorBoundary>
              </div>
            </main>
          </Route>
          <Route exact path="/">
            <Redirect to="/movies" />
          </Route>
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
      <Footer />
    </Provider>
  );
};

export default App;
