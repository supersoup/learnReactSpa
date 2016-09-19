/**
 * Created by Administrator on 2016/9/19.
 */
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		contentBase: "./app", //最好写上，否则报错，难道这里是一个坑？
		port: 9999
	},

	entry: [
		path.resolve(__dirname, 'app/src/main.jsx')
	],

	output: {
		path: 'dist',
		publicPath: 'dist',
		filename: '[name].bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader') //坑：不能用叹号链接，必须写成这种格式
			},
			{
				test: /\.js[x]?$/,
				include: path.resolve(__dirname, 'app'),
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},

	resolve: {
		extensions: ['', '.js', '.jsx']
	},

	plugins: [
		new ExtractTextPlugin("style.css"),
		new webpack.HotModuleReplacementPlugin(),
		new OpenBrowserPlugin({ url: 'http://localhost:9999' })
	]
};