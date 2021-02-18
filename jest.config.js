module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ['/node_modules/', 'src/index.js'],

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      'branches': 90,
      'functions': 90,
      'lines': 90,
      'statements': 90,
    },
  },

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'json', 'jsx'],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/'],
};
