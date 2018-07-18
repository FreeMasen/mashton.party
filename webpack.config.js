const path = require('path');
const wp = require('webpack');
module.exports = function(env) {
    let ret = {};
    ret.entry = {
        app: './app/index.tsx',
    };
    ret.output = {
        path: path.join(__dirname, 'js'),
        filename: '[name].js',
    };
    ret.resolve = {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    };
    ret.module = {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            }
        ]
    };
    if (env != 'prod') {
        ret.mode = 'development';
        ret.devtool = 'sourcemap';
        ret.devServer = {
            historyApiFallback: true,
            publicPath: '/js/',
        }
    } else {
        ret.mode = 'production';
        ret.plugins = [
            new wp.optimize.UglifyJsPlugin()
        ]
    }
    return ret;
}