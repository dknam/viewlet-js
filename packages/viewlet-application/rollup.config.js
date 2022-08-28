
const input = "./src/components/simple_component.tsx"

module.exports = [
	{
		input: input,
		output: {
			file: "dist/simple_component.js",
			format: "umd",
			globals: {
				"react": "React",
				"@viewlet-core": "ViewletCore"
			}
		}
	}
];
