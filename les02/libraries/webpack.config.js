const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        contentBase: './public'
    },
    optimization: {
        /*
            This is done to avoid creation of unwanted license file for the dependencies
         */
        minimize: true,
        minimizer: [new TerserPlugin({
            extractComments: false,
        })]
    }
};