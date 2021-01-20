const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    passport.use('createItem', new LocalStrategy({
            usernameField: 'title',
            passwordField: 'price',
            session: false
        },
        async function(title, price, done) {
            if (!title) {
                done(null, false, {
                    "field":"title",
                    "message":"Title is required"
                });
            }
            if (!price) {
                done(null, false, {
                    "field": "price",
                    "message": "Price is required"
                });
            }
            done(null, true);
        }
    ));

}
