const LocalStrategy = require('passport-local').Strategy;
const {findUserFromBase} = require('../functions/apiFunctions');

module.exports = function (passport, req, res) {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        async function(email, password, done) {
        const user = await findUserFromBase(email, password);
            if (user) {
                done(null, true)
            } else {
                done(null, false, {message: 'Incorrect username.' });
            }
        }
    ));

}
