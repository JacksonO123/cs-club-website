import type { Configuration } from 'webpack';

const config: Configuration = {
	module: {
		rules: [
			{
				test: /\.(png|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
		],
	},
};

module.exports = config;