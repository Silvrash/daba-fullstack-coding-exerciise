const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

// const appVersion = `v${package.version}`.replace(/.\d$/, '');

var isMac = process.platform === 'darwin';
const sedCmd = `sed -i ${isMac ? "''" : ''}`;

module.exports = (env) => {
	const staging = !!env.staging;
	const envFile = './src/.env'
	return {
		entry: {
			app: path.resolve(__dirname, 'dist/index.js'),
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: [path.resolve(__dirname, 'dist/_migrations')],
				},
			],
		},
		resolve: {
			extensions: ['.js', '.json', '.graphql', '.txt', '.html'],
			alias: {
				'@shared': path.resolve(__dirname, 'dist/_shared/index'),
				src: path.resolve(__dirname, 'dist'),
			},
		},
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: '[name].js',
			libraryTarget: 'umd',
		},
		mode: 'production',
		target: 'node',
		plugins: [
			new CleanWebpackPlugin(),
			new CopyPlugin({
				patterns: [
					/** copy compiled migrations */
					{ from: './dist/_migrations', to: `_migrations` },
					{ from: './src/schemas', to: `schemas` },
					{ from: 'Procfile' },
					{ from: 'package.json' },
					{ from: envFile, to: '.env', toType: 'file' },
				],
			}),
			new WebpackShellPluginNext({
				onBeforeNormalRun: {
					scripts: ['rimraf dist', 'rimraf build', 'tsc -p tsconfig.build.json'],
				},
				onAfterDone: {
					scripts: [
						`${sedCmd} 's|"..\\/_migrations"|".\\/_migrations"|g' build/app.js`,
						`yarn rimraf dist`,
					],
				},
			}),
		],
		externals: [
			nodeExternals({
				modulesDir: path.resolve(__dirname, './node_modules'),
			}),
		],
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						ecma: 8,
						keep_classnames: true,
						keep_fnames: true,
						module: true,
						mangle: {
							module: true,
							keep_classnames: true,
							keep_fnames: true,
						},
					},
				}),
			],
		},
		node: {
			__dirname: false,
		},
	};
};
