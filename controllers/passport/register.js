const LocalStrategy = require('passport-local').Strategy;
const {findUserFromBase} = require('../functions/apiFunctions');

module.exports = function (passport) {
    passport.use('register', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true,
            session: false
        },
        async function(req, email, password,  done) {
            const user = await findUserFromBase(email, password);
            if (user) {
                done(null, false, {message: 'User exist' });
            } else {
                done(null, true)
            }
        }
    ));

}
