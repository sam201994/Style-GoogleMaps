const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const config = require('./config');

const entryPathBase = `${config.src.assets.directory}/scripts`;
const stylePath = `${config.src.assets.directory}/stylesheets`;
const outputPathBase = config.assets;

const HOST = process.env.HOST || 'localhost';
const PORT = config.uiPort || 8000;

// local css modules
loaders.push({
    test: /[/\\]src[/\\].*\.css/,
    exclude: /(node_modules|bower_components|public\/)/,
    loader: ExtractTextPlugin.extract('style', 'css'),
});

// local scss modules
loaders.push({
    test: /[/\\]src[/\\].*\.scss/,
    exclude: /(node_modules|bower_components|public\/)/,
    loader: ExtractTextPlugin.extract('style',
        `css!postcss!sass?includePaths[]=${path.resolve(stylePath)}`),
});

// global css files
loaders.push({
    test: /[/\\](node_modules|global)[/\\].*\.css$/,
    loader: ExtractTextPlugin.extract('style', 'css'),
});

module.exports = {
    entry: [
        'react-hot-loader/patch',
        `${entryPathBase}/app.js`,
    ],
    devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
    output: {
        publicPath: '/',
        path: outputPathBase.js,
        filename: '[name].js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders,
    },
    devServer: {
        contentBase: './public',
        // do not print bundle build stats
        noInfo: true,
        // enable HMR
        hot: true,
        // embed the webpack-dev-server runtime into the bundle
        inline: true,
        // serve index.html in place of 404 responses to allow HTML5 history
        historyApiFallback: true,
        port: PORT,
        host: HOST,
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            },
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new DashboardPlugin(),
        new ExtractTextPlugin('[contenthash].css', {
            allChunks: true,
        }),
        new HtmlWebpackPlugin({
            template: `${config.src.directory}/templates/index.hbs`,
            data: {
                title: 'Maps',
                apiBase: config.googleApiKey,
            },
        }),
    ],
};
