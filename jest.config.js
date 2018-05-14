module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  setupTestFrameworkScriptFile: './jest.setup.js',

  snapshotSerializers: [
    'jest-serializer-vue'
  ],

  testMatch: [
    '<rootDir>/(src/**/*.test.(ts|tsx|js)|**/__tests__/*.(ts|tsx|js))'
  ],

  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  }
};
