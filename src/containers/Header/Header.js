import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import GlobalSearch from '../../components/GlobalSearch/GlobalSearch';
import MovieDescriptionWithRouteLoading from '../../components/MovieDescription/MovieDescriptionWithRouteLoading';
import { ADD_ACTION, MOVIES_PATH } from '../../constant';
import { openDialog } from '../../reducers/dialogSlice';
import './Header.scss';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className={'header'}>
      <div className="logo app-logo">NetflixRoulette</div>
      <Switch>
        <Route exact path={`${MOVIES_PATH}/:movieId`} component={MovieDescriptionWithRouteLoading} />
        <Route path="*">
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
          <GlobalSearch />
        </Route>
      </Switch>
    </header>
  );
};

export default Header;
