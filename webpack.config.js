const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/js/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name]-bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				include: path.resolve(__dirname, 'src'),
				exclude: path.resolve(__dirname, 'node_modules'), //绝对路径 exclude代表不去解析这个目录下的.js文件
			},
			{
				test: /\.css$/,
				use: [
					'style-loader', 
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader',
						options: {
						    ident: 'postcss',
						    plugins: [
						    	require('autoprefixer')({broswer: 'last 5 versions'}), //处理CSS前缀问题，自动添加前缀
						    ]
						  }
					}
				],
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1000, //小于这个大小的图片将被base64编码
							name: 'assets/[name]-[hash:5].[ext]'   //制定打包后的路径及名字
						}
					},
					{
						loader: 'image-webpack-loader', //压缩图片 配合url-loader或file-loader使用
					}
				]
				
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			template: 'index.html',
			filename: 'index.html',
			inject: 'body',
			title:'myproject'
		})
	]
}