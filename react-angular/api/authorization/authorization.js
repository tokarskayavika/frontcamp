function authorization(app) {
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    const models = require('../models/models.js');

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password'
            },
            function(username, password, done) {
                models.user.findOne({username: username}, function(err, user) {
                    return err
                        ? done(err)
                        : user
                        ? password === user.password
                        ? done(null, user)
                        : done(null, false, {message: 'Incorrect password.'})
                        : done(null, false, {message: 'Incorrect username.'});
                });
            })
    );

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
}

module.exports = authorization;
