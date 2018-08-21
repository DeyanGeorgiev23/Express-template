const homeController = require('./home-controller');
const userController = require('./users-controllers');

module.exports = {
    home: homeController,
    user: userController
};