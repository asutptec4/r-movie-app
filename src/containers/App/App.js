import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import NotFound from '../../components/NotFound/NotFound';
import { MOVIES_PATH, NOT_FOUND_PATH, SEARCH_PATH } from '../../constant';
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
          <Route path={[MOVIES_PATH, SEARCH_PATH]}>
            <Header />
            <main>
              <div className="content">
                <ErrorBoundary>
                  <MovieListContainer />
                </ErrorBoundary>
              </div>
            </main>
          </Route>
          <Route path={NOT_FOUND_PATH} component={NotFound} />
          <Route exact path="/">
            <Redirect to={MOVIES_PATH} />
          </Route>
          <Redirect to={NOT_FOUND_PATH} />
        </Switch>
      </Router>
      <Footer />
    </Provider>
  );
};

export default App;
