const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
        /*
            The code from bundle.js will be executed when HTML loads it.
            But, by default, we cannot access it. To be able to access it from
            other JS in the page, we need to export it as a module.
            In this case, the module will be called 'EntryPoint', which is a 'var'.
            Note: this is just an example. In general, we will not need to do something
            like this, as all the code we will run is from bundle.js itself

            NOTE: this does not work yet in WebPack 5 (regression bug)... so need to use v4.
            Anyway, this the only case in the course in which are going to do something like this
         */
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