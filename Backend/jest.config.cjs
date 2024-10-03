const { defaults } = require('jest-config');

module.exports = {
  ...defaults,
  testMatch: ['<rootDir>/Test/**/*.test.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
