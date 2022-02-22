/** @type {import('next').NextConfig} */
const { resolve } = require('path');

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    },
    {
      test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader',
      exclude: [resolve(__dirname, '..', 'src', 'images')]
    });

    return config;
  }
};
