const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
	  rules: [
	  {
		test: /\.(ico|png)$/,
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
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: "dist"
    })
  ]
}