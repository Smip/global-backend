'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        hooks: {
            afterValidate: function (user) {
                user.password = bcrypt.hashSync(user.password, 8);
            }
        }
    });
    User.associate = function (models) {
        // associations can be defined here
    };
    User.prototype.validPassword = function (password, done) {
        bcrypt.compare(password, this.password, (err, isMatch) => {
            if (err) console.log(err);
            if (isMatch) {
                return done(null, this)
            } else {
                return done(null, false)
            }
        });
    };

    return User;
};
