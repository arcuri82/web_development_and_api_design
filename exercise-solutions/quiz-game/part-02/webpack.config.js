const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
        libraryTarget: 'var',
        library: 'EntryPoint'
    },
    devServer: {
        contentBase: './public'
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            extractComments: false,
        })]
    }
};