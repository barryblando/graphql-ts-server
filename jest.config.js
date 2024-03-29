module.exports = {
	roots: ['<rootDir>/src/'],
  preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: [
    "**/**/?(*.)+(spec|test).+(ts)"
  ],
  "transform": {
    "^.+\\.(ts)$": "ts-jest"
  },
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.jest.json'
		}
	}
};
