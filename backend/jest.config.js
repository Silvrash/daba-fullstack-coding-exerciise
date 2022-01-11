const { resolve } = require('path');

module.exports = {
	preset: 'ts-jest',
	setupFiles: ['./setupTests.ts'],
	setupFilesAfterEnv: ['./cleanUpTest.ts'],
	testEnvironment: 'node',
	collectCoverage: true,
	coverageReporters: ['json', 'html'],
	collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}', 'e2e/**/*.{js,jsx,ts,tsx}'],
	coveragePathIgnorePatterns: [
		'node_modules',
		'src/_migrations',
		'src/_shared/logger',
		'src/_shared/db',
		'src/app',
		'src/index',
	],
	coverageThreshold: {
		global: {
			branches: 50,
			functions: 50,
			lines: 50,
			statements: 50,
		},
	},
	testPathIgnorePatterns: ['<rootDir>/node_modules/'],
	globals: {
		'ts-jest': {
			isolatedModules: true,
		},
		NODE_ENV: 'test',
	},
	moduleNameMapper: {
		'^@shared(.*)$': resolve(__dirname, './src/_shared$1'),
		'^src/(.*)$': resolve(__dirname, './src/$1'),
		'^src$': resolve(__dirname, './src/index'),
		'^e2e/(.*)$': resolve(__dirname, './e2e/$1'),
	},
};
