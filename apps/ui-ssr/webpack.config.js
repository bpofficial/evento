const config = require('../../webpack.config');


// TODO: Setup hydration file to be moved to S3
module.exports = {
    ...config,
    entry: {...config.entry, './src/app/hydrate': './src/app/hydrate.tsx'}
}
