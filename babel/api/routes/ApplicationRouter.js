function ApplicationRouter(app) {
    const express = require('express');
    const winston = require('winston');
    const router = express.Router();
    const PostRouter = require('./PostRouter.js');
    const UserPouter = require('./UserRouter.js');

    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.File({filename: 'logging.log'})
        ]
    });

    app.all('*', function(request, response, next) {
        const date = new Date();

        next();
        logger.log({
            level: 'info',
            url: request.url,
            date: date.toISOString()
        });
    });

    app.use('/blogs', PostRouter);
    app.use('/', UserPouter);
}

module.exports = ApplicationRouter;