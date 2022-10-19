import { resolve } from 'path';
import {
  mergeWithCustomize,
  customizeArray,
  CustomizeRule
} from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import type { Configuration as WebpackConfiguration } from 'webpack';
import type {
  Configuration as WebpackDevServerConfiguration,
  Middleware
} from 'webpack-dev-server';

import baseConfig from './base.config';
import Server from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const configuration: Configuration = mergeWithCustomize<Configuration>({
  customizeArray: customizeArray({
    'module.rules': CustomizeRule.Replace
  })
})(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 4301,
    hot: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/auth/, to: '/auth.html' },
        { from: /./, to: '/index.html' }
      ]
    },
    setupMiddlewares: (middlewares: Middleware[], devServer: Server) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      devServer?.app?.get('/config.js', (_, res) => res.status(204).send());
      return middlewares;
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: resolve(__dirname, '../babel.config.js'),
              plugins: ['react-refresh/babel']
            }
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: resolve(__dirname, '../tsconfig.json'),
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true
            }
          }
        ],
        include: [resolve(__dirname, '..', 'src', 'images')]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
              publicPath: 'images'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ],
        include: [
          resolve(__dirname, '../node_modules/ansi-styles'),
          resolve(__dirname, '../node_modules/chalk'),
          resolve(__dirname, '../node_modules/react-dev-utils')
        ]
      },
      {
        test: /\.(js|ts)x?$/,
        use: ['source-map-loader'],
        enforce: 'pre',
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        exclude: [resolve(__dirname, '..', 'src', 'images')]
      }
    ]
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      eslint: { files: './src/**/*.{tsx,ts,jsx,js,json,html}' }
    })
  ]
});

export default configuration;
