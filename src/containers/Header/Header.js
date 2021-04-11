import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import GlobalSearch from '../../components/GlobalSearch/GlobalSearch';
import MovieDescriptionWithRouteLoading from '../../components/MovieDescription/MovieDescriptionWithRouteLoading';
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
      <div className="logo app-logo">NetflixRoulette</div>
      <Switch>
        <Route exact path={['/movies', '/search', '/search/:query']}>
          <div className="control-area">
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
      </Switch>
    </header>
  );
};

export default Header;
