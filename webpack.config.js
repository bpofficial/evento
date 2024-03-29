const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    externals: [nodeExternals()],
    devtool: 'source-map',
    name: 'serverless',
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
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    stats: 'none', // errors-only, minimal, none, normal, verbose
    output: {
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, '.webpack'),
        filename: '[name].js',
    },
};
