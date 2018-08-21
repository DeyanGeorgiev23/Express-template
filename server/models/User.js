const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');

const userSchema = new mongoose.Schema({
    username: { type: mongoose.SchemaTypes.String, required: true, unique: true },
    password: { type: mongoose.SchemaTypes.String, required: true },
    salt:  { type: mongoose.SchemaTypes.String, required: true },
    firstName: { type: mongoose.SchemaTypes.String },
    lastName: { type: mongoose.SchemaTypes.String },
    age: { type: mongoose.SchemaTypes.Number, default: 18 },
    roles: [{ type: mongoose.SchemaTypes.String }]
});

userSchema.method({
    authenticate: function (password) {
        let hashedPassword = encryption.generateHashedPass(this.salt, password);

        if (hashedPassword === this.password) {
            return true;
        }

        return false;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

module.exports.seedAdminUser = () => {
    User.find({ username: 'admin' }).then(user => {
        if (user.length === 0) {
            let salt = encryption.generateSalt();
            let hashedPass = encryption.generateHashedPass(salt, 'adminUser');

            User.create({
                username: 'admin',
                password: hashedPass,
                salt: salt,
                firstName: 'Admin',
                lastName: 'Admin',
                age: 30
            });
        }
    });
};
