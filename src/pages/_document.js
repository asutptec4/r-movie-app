import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

class AppDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <title>NetflixRoulette</title>
          <meta name="description" content="NetflixRoulette is cool movie service."></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="modal-root"></div>
        </body>
      </Html>
    );
  }
}

export default AppDocument;
