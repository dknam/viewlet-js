const path = require('path');

module.exports = {
  	projects: [
		{
			transform: {
				"^.+\\.ts$": "ts-jest",
				"^.+\\.tsx$": "ts-jest",
			},
			// rootDir: "packages/viewlet-core/__tests__",
			moduleFileExtensions: ["ts", "tsx", "js", "json"],
			testRegex: "(/<rootDir>/packages/viewlet-core/.*|\\.spec)\\.(ts|tsx|js)$",
			testEnvironment: "jsdom"
		},
		{
			transform: {
				"^.+\\.ts$": "ts-jest",
				"^.+\\.tsx$": "ts-jest",
			},
			moduleNameMapper: {
				"^@viewlet-core/(.*)$": "<rootDir>/packages/viewlet-core/src/*",
			},
			// rootDir: "packages/viewlet-platform/__tests__",
			moduleFileExtensions: ["ts", "tsx", "js", "json"],
			testRegex: "(/<rootDir>/packages/viewlet-platform/.*|\\.spec)\\.(ts|tsx|js)$",
			testEnvironment: "jsdom"
		}
	],
};
