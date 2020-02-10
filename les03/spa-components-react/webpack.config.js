const path = require('path');

module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        //apply special rules, like using Babel
        rules: [
            {
                /*
                    This rule will apply to all files that "test" as true from this regex.
                    Note: the term "test" here has nothing to do with test cases.
                    Regex in JS are within 2 /:
                    \. : the "." character, that must be escaped
                    jsx: the string "jsx"
                    $: represents the end of the match (recall a regex can match just a substring of a text)
                    So, do match any file that ends with ".jsx"

                    Note: /\.jsx$/  and /^.*\.jsx$/ would be equivalent
                 */
                test: /\.jsx$/,
                /*
                    Do not search for files to transform inside "node_modules".
                 */
                exclude: /node_modules/,
                use: {
                    // apply Babel to all those .jsx files. Note that the .js ones will be skipped
                    loader: "babel-loader"
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        contentBase: './public'
    }
};