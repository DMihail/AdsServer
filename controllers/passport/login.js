const LocalStrategy = require('passport-local').Strategy;
const {findUserFromBase} = require('../functions/apiFunctions');

module.exports = function (passport) {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        async function(email, password, done) {
            if (await findUserFromBase(email, password)) {
                done(null, true)
            } else {
                done('user not exist', false);
            }
        }
    ));

}