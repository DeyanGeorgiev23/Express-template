const env = process.env.NODE_ENV || 'development';
const config = require('./server/config/config')[env];
const express = require('express');

const app = express();

require('./server/config/database')(config);
require('./server/config/express')(app);
require('./server/config/routes')(app);
require('./server/config/passport')();

app.listen(config.port, () => {
    console.log(`Express ready and listen on port ${config.port}...`);
});