const config = require('../../webpack.config');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const outDir = path.resolve(config.output.path);
const assetsDir = path.resolve(outDir + '/src/assets');
const appDir = path.resolve(outDir + '/src/app');

// Setup for copying standalone hydration file.
module.exports = [
    config,
    {
        name: 'hydration',
        target: 'web',
        dependencies: [config.name],
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
                "crypto": require.resolve("crypto-browserify"),
                "stream": require.resolve("stream-browserify")
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
        entry: { './src/app/hydrate': './src/app/hydrate.tsx' },
        plugins: [
            new FileManagerPlugin({
                events: {
                    onEnd: [
                        {
                            mkdir: [
                                assetsDir,
                                assetsDir + '/js',
                                assetsDir + '/css',
                            ],
                        },
                        {
                            copy: [
                                {
                                    source: appDir + '/hydrate.js',
                                    destination: assetsDir + '/js/hydrate.js',
                                },
                                {
                                    source: appDir + '/hydrate.js.map',
                                    destination:
                                        assetsDir + '/js/hydrate.js.map',
                                },
                            ],
                        },
                    ],
                },
            }),
        ],
        stats: 'minimal', // errors-only, minimal, none, normal, verbose
        output: {
            ...config.output,
            libraryTarget: 'window',
        },
    }
];
