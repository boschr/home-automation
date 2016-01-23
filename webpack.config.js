var path = require( "path" );

module.exports = {
    entry: "./public/js/client.js",
    output: {
        path: __dirname + '/public/js/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.scss/,
                loader: 'style!css!sass?includePaths[]=' + (path.resolve(__dirname, "./node_modules"))
            },
            {
                test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff2"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ]
    }
};
