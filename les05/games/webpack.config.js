const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        contentBase: './public'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            ['~']: path.resolve(__dirname + '/src')
        }
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            extractComments: false,
        })]
    }

};