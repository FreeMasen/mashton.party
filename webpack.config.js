const path = require('path');
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
        }
    } else {
        opts.mode = 'production';
    }
    return ret;
}