import typescript from 'rollup-plugin-typescript2';

const baseConfig = require(`./packages/${process.env.MODULE_NAME}/rollup.config.js`);
export default [
	...baseConfig.map((config) => {
		config.plugins = [
			typescript({
				tsconfig: "tsconfig.json",
			}),
		];
        return config;
	}),
];
