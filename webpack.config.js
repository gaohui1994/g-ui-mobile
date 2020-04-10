const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件
// css / less提取
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 打包与清除: 每次打包之前清除dist下的内容
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');

// css压缩
const CssnanoPlugin = require('cssnano-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'src', 'js', 'index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js'
	},
	module: {
		rules: [
			// css/less语法支持
			{
				test: /\.(le|c)ss$/,
				// 样式loader的处理
				use: [
					// 分离css
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {
								path: 'postcss.config.js'
							}
						}
					},
					{
						loader: 'less-loader'
					},
				]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192, // 小于8192字节的图片打包成base 64图片
						name: 'images/[name].[hash:8].[ext]',
					}
				}]
			},
			// 文件依赖配置项——字体图标
			{
				test: /\.(woff|woff2|svg|eot|ttf|otf)$/,
				use: [{
					loader: 'file-loader',
					options: {
						limit: 8192,
						name: 'fonts/[name].[ext]?[hash:8]',
					},
				}],
			},
			// 文件依赖配置项——音频
			{
				test: /\.(wav|mp3|ogg)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						limit: 8192,
						name: 'audios/[name].[ext]?[hash:8]',
					},
				}],
			},
			// 文件依赖配置项——视频
			{
				test: /\.(ogg|mpeg4|webm)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						limit: 8192,
						name: 'videos/[name].[ext]?[hash:8]',
					},
				}],
			},
		]
	},
	optimization: {
		minimizer: [
			new CssnanoPlugin()
		]
	},
	plugins: [
		// 热重载
		new webpack.HotModuleReplacementPlugin(),
		// 定义当前服务依赖的模板
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'index.css'
		}),
		// 在每次打包的时候清除之前的内容
		new CleanWebpackPlugin()
	],
	// html文件变化, 自动更新
	devServer: {
		port: 9000,
		hot: true,
		contentBase: path.join(__dirname, '/src'),
		watchContentBase: true,
	},
}