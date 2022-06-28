const config = require('../../webpack.config');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outDir = path.resolve(__dirname, './.webpack/service');

config.output.path = outDir;
config.plugins = []

// Setup for copying standalone hydration file.
module.exports = [
    {
        name: 'hydration',
        target: 'web',
        mode: config.mode,
        devtool: 'source-map',
        resolve: {
            extensions: ['.js', '.json', '.ts', '.tsx'],
            plugins: [new TsconfigPathsPlugin()],
            fallback: {
                path: false,
                assert: false,
                util: false,
                fs: false,
                crypto: require.resolve("crypto-browserify"),
                stream: require.resolve("stream-browserify")
            },
        },
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
        plugins: [new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './src/app/html.template.ejs'),
            publicPath: '/assets'
        })],
        entry: { './src/app/hydrate': './src/app/hydrate.tsx' },
        stats: 'minimal', // errors-only, minimal, none, normal, verbose
        output: {
            ...config.output,
            path: path.resolve(outDir, './src/app/assets/'),
            filename: './js/hydrate.js',
            libraryTarget: 'window',
        },
    },
    config,
];
