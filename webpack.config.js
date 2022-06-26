const path = require('path');
const webpack = require('webpack');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const node_dir = __dirname + '/node_modules';
console.log(slsw.lib.entries);
module.exports = {
    externals: [nodeExternals()],
    devtool: 'source-map',
    entry: slsw.lib.entries,
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
        plugins: [new TsconfigPathsPlugin()],
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: '**/assets/**'},
            ],
        })
    ],
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    stats: 'minimal', // errors-only, minimal, none, normal, verbose
    output: {
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, '.webpack'),
        filename: '[name].js',
    },
};
