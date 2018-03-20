function UserRouter() {
    const express = require('express');
    const router = express.Router();
    const models = require('../models/models.js');
    const passport = require('passport');

    router.post('/login', function(request, response, next) {
        passport.authenticate('local', function(error, user, info) {
            if (error) {
                return next(error);
            }

            if (user) {
                response.send(user);
            } else {
                response.send({
                    error: 'Unknown user!'
                });
            }

        })(request, response, next);
    });

    router.post('/register', function(request, response, next) {
        models.user.findOne({username: request.body.username}, function(error, user) {
            if (error) {
                response.send(error);
            }

            if (user) {
                response.send({error: 'User already exists!'});
            } else {
                const userModel = new models.user({
                    username: request.body.username,
                    password: request.body.password
                });

                userModel.save(function(error, result) {
                    response.send(error || result);
                });
            }
        });
    });

    return router;
}

module.exports = UserRouter();