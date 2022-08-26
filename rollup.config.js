import typescript from 'rollup-plugin-typescript2';

const input = process.env.INPUT_FILE;

export default [
	{
		input: input,
		output: {
            // dir: "dist",
			// sourcemap: true,
			file: "dist/esm/index.js",
			format: 'es',
		},
		plugins: [
			typescript({
				tsconfig: "tsconfig.json"
			})
		],
	},
    {
		input: input,
		output: {
            // dir: "dist",
			// sourcemap: true,
			file: "dist/cjs/index.js",
			format: 'cjs',
		},
		plugins: [
			typescript({
				tsconfig: "tsconfig.json"
			})
		],
	}
]
