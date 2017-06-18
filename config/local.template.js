process.env.NODE_ENV = 'development';

const _ = require('lodash');

const baseSettings = require('./base');

const settings = {
    port: 3000,
    uiPort: 3001,
    googleApiKey: 'ADD_KEY',
};

module.exports = _.merge(baseSettings, settings);
