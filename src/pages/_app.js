import React from 'react';

import '../containers/App/App.scss';
import Footer from '../containers/Footer/Footer';
import '../containers/Header/Header.scss';
import { wrapper } from '../store/store';

// eslint-disable-next-line react/prop-types
const App = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default wrapper.withRedux(App);
