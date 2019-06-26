const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
const User = require('../models').User;

module.exports = function (passport) {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = "somesecretoftoken";
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({
            where: {
                id: jwt_payload.id
            }
        }).then(function (user) {
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};
