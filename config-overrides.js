// //const path = require('path');
// import path from 'path'
// module.exports = {
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js',
//   },
//   module: {
//     rules: [
//       // Add rules for processing different types of files
//       // For example, transpiling JavaScript using Babel, handling CSS files, etc.
//     ],
//   },
//   plugins: [
//     // Add plugins for additional functionality
//     // For example, generating an HTML file, optimizing bundles, etc.
//   ],


//   // Other configuration options...

//   resolve: {
//     fallback: {
//       path: require.resolve("path-browserify"),
//       //fs: false, 
//       fs: require.resolve("fs"),
//       stream:require.resolve("stream"),
//       streamb: require.resolve("stream-browserify")
//     }
//   }




// };


const webpack = require("webpack");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  return config;
};