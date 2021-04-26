import React from 'react';

import PageWithSearch from '../../components/next/PageWithSearch';
import { fetchMovies, setSearchText } from '../../src/reducers/moviesSlice';
import { wrapper } from '../../src/store/store';

const Search = () => {
  return <PageWithSearch />;
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  store.dispatch(setSearchText(''));
  await store.dispatch(fetchMovies());
});

export default Search;
