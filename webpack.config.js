// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const preprocess = require("svelte-preprocess");

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
		entry: {
				'build/bundle': ['./src/main.js']
		},
		resolve: {
				alias: {
						svelte: path.dirname(require.resolve('svelte/package.json'))
				},
				extensions: [
						'.mjs', '.js', '.svelte'
				],
				mainFields: [
						'svelte', 'browser', 'module', 'main'
				],
				fallback: {
						"buffer": require.resolve("buffer/"),
						"path": require.resolve("path-browserify"),
						"fs": false
				}
		},
		output: {
				path: path.join(__dirname, '/public'),
				filename: '[name].js',
				chunkFilename: '[name].[id].js'
		},
		module: {
				rules: [
						{
								test: /\.svelte$/,
								use: {
										loader: 'svelte-loader',
										options: {
												// compilerOptions: { 		dev: !prod }, emitCss: prod, hotReload: !prod,
												preprocess: preprocess()
										}
								}
						}, {
								test: /\.s?css$/,
								use: ["style-loader", "css-loader"]
						}, {
								// required to prevent errors from Svelte on Webpack 5+
								test: /node_modules\/svelte\/.*\.mjs$/,
								resolve: {
										fullySpecified: false
								}
						}, {
								test: /\.svg$/,
								loader: 'svg-inline-loader',
								options: {
										removeSVGTagAttrs: true
								}
						}
				]
		},
		mode,
		plugins: [],
		devtool: prod
				? false
				: 'source-map',
		devServer: {
				hot: true
		}
};
