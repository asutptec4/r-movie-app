import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import GlobalSearch from '../../components/GlobalSearch/GlobalSearch';
import MovieDescriptionWithRouteLoading from '../../components/MovieDescription/MovieDescriptionWithRouteLoading';
import NotFound from '../../components/NotFound/NotFound';
import { ADD_ACTION } from '../../constant';
import { openDialog } from '../../reducers/dialogSlice';
import { fetchMovies, setSearchText } from '../../reducers/moviesSlice';
import './Header.scss';

const Header = () => {
  const dispatch = useDispatch();

  const handleSearch = (searchText) => {
    dispatch(setSearchText(searchText));
    dispatch(fetchMovies());
  };

  return (
    <header className={'header'}>
      <Switch>
        <Route exact path={['/movies', '/search']}>
          <div className="control-area">
            <span className="logo app-logo">NetflixRoulette</span>
            <div className="user-controls">
              <button
                className="control-button"
                onClick={() => dispatch(openDialog({ action: ADD_ACTION, movie: {} }))}
              >
                + Add Movie
              </button>
            </div>
          </div>
          <GlobalSearch handleSearch={handleSearch} />
        </Route>
        <Route exact path="/movies/:movieId" component={MovieDescriptionWithRouteLoading} />
        <Route path="*" component={NotFound} />
      </Switch>
    </header>
  );
};

export default Header;
