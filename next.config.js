module.exports = {
  future: {
    webpack5: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/movies',
        permanent: false,
      },
    ];
  },
};
