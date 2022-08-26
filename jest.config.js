const path = require('path');

module.exports = {
	transform: {
		"^.+\\.ts$": "ts-jest",
		"^.+\\.tsx$": "ts-jest",
	},
	// moduleNameMapper: {
	// 	"react": path.resolve(__dirname, "node_modules/react"),
	// },
	// moduleDirectories: ['node_modules', '<rootDir>/src'],
	rootDir: "__tests__",
	moduleFileExtensions: ["ts", "tsx", "js", "json"],
	//   globalSetup: '<rootDir>/global.setup.js',
	// testPathIgnorePatterns: ["/node_modules/(?!(react)/)"],
	// setupFiles: ["<rootDir>/global.setup.js"],
	testRegex: "(/<rootDir>/.*|\\.spec)\\.(ts|tsx|js)$",
	testEnvironment: "jsdom"
};
