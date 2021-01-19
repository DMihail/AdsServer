const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {secret} = require('../../config/index');

module.exports = function (passport) {
    const opts = {
        jwtFromRequest: ExtractJwt.fromBodyField(),
        secretOrKey: secret
    };

    passport.use(new JwtStrategy(opts, function(payload, done) {

    }));

}

