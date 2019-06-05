const webpack = require('webpack');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'public', 'build'),
        publicPath: '/build/',
        filename: 'bundle.js'
    },
    watch: NODE_ENV === 'development',
    devtool: NODE_ENV === 'development' && 'eval-source-map',
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: ['react-hot-loader', 'babel-loader']
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            loaders: ['style-loader', 'css-loader']
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            }
        })
    ]
};
