const path = require('path');

const root = path.resolve(__dirname, '..');

module.exports = {
    rootDirectory: root,
    port: 80,
    uiPort: 80,
    keys: ['12345689', '098765432'],
    parser: {
        formLimit: '5mb',
        textLimit: '5mb',
        jsonLimit: '5mb',
    },
    authentication: {
        tokenKey: 'authToken',
    },
    cors: {
        enabled: true,
        credentials: true,
    },
    sessions: {
        enabled: true,
        cookie: {
            domain: 'localhost',
        },
    },
    src: {
        directory: path.resolve(root, 'src'),
        assets: {
            directory: path.resolve(root, 'src', 'assets'),
        },
        templates: {
            directory: path.resolve(root, 'src', 'templates'),
        },
    },
    assets: {
        base: path.resolve(root, 'public'),
        js: path.resolve(root, 'public/js'),
        css: path.resolve(root, 'public/css'),
    },
    static: {
        directory: path.resolve(root, 'public'),
        options: {
            prefix: '',
            dynamic: false,
            gzip: true,
        },
    },
};
