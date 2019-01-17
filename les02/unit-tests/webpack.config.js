const path = require('path');

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
         */
        libraryTarget: 'var',
        library: 'EntryPoint'
    },
    devServer: {
        contentBase: './public'
    }
};