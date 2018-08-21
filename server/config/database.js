const mongoose = require('mongoose');
const User = require('../models/User');
mongoose.Promise = global.Promise;

module.exports = (config) => {
    mongoose.connect(config.db);
    let db = mongoose.connection;

    db.once('open', err => {
        if (err) {
            throw err;
        };

        console.log('MongoDB ready and connected!');

        User.seedAdminUser();
    });

    db.on('error', err => {
        console.log(`Database error: ${err}`);
    });
};
