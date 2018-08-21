const path = require('path');

let rootPath = path.normalize(path.join(__dirname, '/../../'));

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost:27017/Express-template',
        port: 3000
    },
    production: {
        port: process.env.PORT
    }
};