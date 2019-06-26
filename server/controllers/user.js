const User = require('../models').User;
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../config/passport')(passport);

module.exports = {
    create(req, res) {
        return User
            .create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                password: req.body.password
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        console.log(req.user.id);
        return User
            .findAll({
                attributes: ['firstName', 'lastName', 'email', 'userName'] //SELECT foo, bar ...
            })
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },
    me(req, res) {
        return User
            .findOne({
                where: {
                    id: req.user.id
                },
                attributes: ['firstName', 'lastName', 'email', 'userName'] //SELECT foo, bar ...
            })
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error));
    },
    auth(req, res) {
        return User
            .findOne({
                where: {
                    userName: req.body.username
                }
            })
            .then(user => {
                if (!user) {
                    res.status(400).send({message: 'Invalid username'});
                    return;
                }
                if (!req.body.password) {
                    res.status(400).send({message: 'Invalid password'});
                    return;
                }
                user.validPassword(req.body.password, function (err, u) {
                    if (u) {
                        const token = jwt.sign(u.toJSON(), "somesecretoftoken", {
                            expiresIn: 604800 // 1 week
                        });
                        console.log(token);
                        res.status(200).send({token: token});
                        return;
                    } else {
                        res.status(400).send({message: 'Invalid password'});
                        return;
                    }
                });
            })
            .catch(error => res.status(400).send(error));
    },
};
