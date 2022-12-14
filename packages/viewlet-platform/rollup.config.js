const input = "./src/index.ts";

module.exports = [
	{
		input: input,
		output: {
			file: "dist/esm/index.js",
			format: "es",
		}
	},
	{
		input: input,
		output: {
			name: "ViewletPlatform",
			file: "dist/umd/index.js",
			format: "umd",
			globals: {
				"react": "React",
				"react-dom": "ReactDOM",
				"react-redux": "ReactRedux",
				"redux": "Redux",
				"@viewlet-core": "ViewletCore"
			}
		}
	},
];
