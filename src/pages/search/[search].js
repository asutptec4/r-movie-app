import React from 'react';

import PageWithSearch from '../../components/next/PageWithSearch';
import { fetchMovies, setSearchText } from '../../reducers/moviesSlice';
import { wrapper } from '../../store/store';

const Search = () => {
  return <PageWithSearch />;
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, params }) => {
  store.dispatch(setSearchText(params.search));
  await store.dispatch(fetchMovies());
});

export default Search;
