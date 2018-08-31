const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
	},
	devtool: 'source-map',
  module: {
	  rules: [
	  {
		test: /\.(ico|png|css)$/,
		use: [
		{
			loader: "file-loader",
			options: {
				name: "[name].[ext]"
			}
		}
		]
	  }
	]
  },
  plugins: [
    new HtmlWebpackPlugin({
		template: 'src/index.html',
	})
  ]
}