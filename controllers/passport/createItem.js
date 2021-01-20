const LocalStrategy = require('passport-local').Strategy;
const {getItem} = require('../functions/apiFunctions');

module.exports = function (passport) {
    passport.use('item', new LocalStrategy({
            usernameField: 'title',
            passwordField: 'price',
            passReqToCallback : true,
            session: false
        },
        async function(req, title, price, done) {
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

            if (req.headers.authorization) {
                const item = await getItem(req);
                if (item) {
                    done(null, false);
                }
            }
            done(null, true);
        }
    ));

}
