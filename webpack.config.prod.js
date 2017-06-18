const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const loaders = require('./webpack.loaders');
const config = require('./config');

const entryPathBase = `${config.src.assets.directory}/scripts`;
const stylePath = `${config.src.assets.directory}/stylesheets`;
const outputPaths = config.assets;

// local css modules
loaders.push({
    test: /[/\\]src[/\\].*\.css/,
    exclude: /(node_modules|bower_components|public\/)/,
    loader: ExtractTextPlugin.extract('style',
        'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
});

// local scss modules
loaders.push({
    test: /[/\\]src[/\\].*\.scss/,
    exclude: /(node_modules|bower_components|public\/)/,
    loader: ExtractTextPlugin.extract('style',
        `css?postcss!sass?includePaths[]=${path.resolve(stylePath)}`),
});

// global css files
loaders.push({
    test: /[/\\](node_modules|global)[/\\].*\.css$/,
    loader: ExtractTextPlugin.extract('style', 'css'),
});

module.exports = {
    entry: { app: [`${entryPathBase}/app.js`] },
    output: {
        publicPath: '/',
        path: outputPaths.base,
        filename: '[name].js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders,
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            },
        }),
        new WebpackCleanupPlugin({
            exclude: ['./images/**/**'],
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                drop_console: true,
                drop_debugger: true,
            },
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('[name].css', {
            allChunks: true,
        }),
        new HtmlWebpackPlugin({
            template: `${config.src.directory}/templates/index.hbs`,
            data: {
                title: 'Maps',
                apiBase: config.googleApiKey,
            },
        }),
        new webpack.optimize.DedupePlugin(),
    ],
};
