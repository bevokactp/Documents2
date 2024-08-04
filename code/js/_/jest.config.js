module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).js'],
    moduleFileExtensions: ['js'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
};