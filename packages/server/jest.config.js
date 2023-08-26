module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  setupFiles: ['dotenv/config'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  testEnvironment: 'node',
  preset: 'ts-jest',
};
