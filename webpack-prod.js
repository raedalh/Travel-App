import { fileURLToPath } from 'url';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as sass from 'sass';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

// Correctly define __dirname in an ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'production', // Production mode
  entry: './src/client/js/app.js', // Entry point for your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'main.[contenthash].js', // Output JavaScript file with cache busting
    clean: true, // Clean the output directory before each build
    assetModuleFilename: 'media/[name].[hash][ext]', // Store images in /dist/media/
  },
  module: {
    rules: [
      {
        test: /\.scss$/, // Match .scss files
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files
          'css-loader', // Translates CSS into CommonJS
          {
            loader: 'sass-loader', // Compiles SCSS to CSS
            options: {
              implementation: sass, // Use Dart Sass explicitly
            },
          },
        ],
      },
      {
        test: /\.js$/, // Match .js files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: 'babel-loader', // Use Babel for JavaScript transpilation
          options: {
            cacheDirectory: true, // Enable caching for Babel
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i, // Match image files
        type: 'asset/resource', // Copy image files to dist/media/
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/views/index.html', // Path to your HTML template
      filename: 'index.html', // Output HTML file name
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css', // Output CSS file name with cache busting
    }),
  ],
  optimization: {
    minimize: true, // Enable minimization
    minimizer: [
      new TerserPlugin(), // Minify JavaScript
      new CssMinimizerPlugin(), // Minify CSS
    ],
  },
};