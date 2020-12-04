module.exports = {
  collectCoverageFrom: [
    './organisms/**/*.{js}',
    './pages/**/*.{js}',
    './utils/**/*.{js}',
    '!**/__tests__/**',
    '!**/*.{test,spec}.js'
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js'
  },
  setupFiles: [],
  setupFilesAfterEnv: [
    // '<rootDir>/setupAfterEnv.js'
  ],
  testMatch: [
    '**/?(*.)+(spec|test).js'
  ],
  testPathIgnorePatterns: [
    '/.next/',
    '/node_modules/',
    '/tests/',
    '/coverage/'
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  }
}
