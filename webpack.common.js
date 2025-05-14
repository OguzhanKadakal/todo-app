const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Todo App',            
    }),
  ],
  module: {
    rules: [
        {
            test: /\.css$/i, 
            use: ["style-loader", "css-loader"], 
        },
    ],
  },
  resolve: {
    extensions: [".js", ".css"],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};