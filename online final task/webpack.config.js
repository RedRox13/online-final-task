const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PrettierPlugin = require("prettier-webpack-plugin");

module.exports = {
  entry: ['./src/js/index.js', './src/scss/styles.scss'],
  output: {
    filename: './js/app.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new ExtractTextPlugin("css/styles.css"),
    new PrettierPlugin({
      printWidth: 80,
      tabWidth: 2,
      useTabs: false,
      semi: true,
      encoding: 'utf-8',
      extensions: [ ".js", ".ts" ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sass|scss)$/,
        include: [
        	path.resolve(__dirname, 'src/scss')
        ],
        use: ExtractTextPlugin.extract({
          use: [{
              loader: "css-loader",
              options: {
              }
            },
            {
              loader: "sass-loader",
              options: {
              }
            }
          ]
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
  	      options: {
            outputPath: './img',
            publicPath: '../img',
            name: '[name].[ext]',
          },   
        }]
      },
  	  {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: './fonts',
            publicPath: '../fonts',
            name: '[name].[ext]',
          },
        }]
      }
          
    ]
  }
};