const nrwlConfig = require('@nrwl/react/plugins/webpack.js');

module.exports = (config) => {
    nrwlConfig(config);
    return {
        ...config,
        resolve: {
            ...(config?.resolve ?? {}),
            fallback: {
                ...(config?.resolve?.fallback ?? {}),
                path: false,
                assert: false,
                util: false,
                fs: false,
                crypto: false,
                stream: false,
            },
        },
    };
};
