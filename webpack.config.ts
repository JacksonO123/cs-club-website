const path = require('path');

const config = {
	mode: process.env.NODE_ENV,
	module: {
		rules: [
			{
				test: /\.(png|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
			{
				test: /\.?js$/,
				exclude: '/node_modules/',
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			}
		],
	},
	resolve: {
		extentions: ['.ts', '.tsx', '.js', '.jsx'],
		alias: {
			"src": path.resolve(__dirname, 'src')
		}
	}
};

module.exports = config;