function ApplicationRouter(app) {
    const express = require('express');
    const winston = require('winston');
    const router = express.Router();
    const PostRouter = require('./PostRouter.js');
    const UserPouter = require('./UserRouter.js');
    const React = require('react');
    const ReactDOMServer = require('react-dom/server');
    const UIRouter  = require('../../scripts/router/UIRouter');
    const StaticRouter = require('react-router-dom').StaticRouter;
    const Provider = require('react-redux').Provider;
    const store = require("../../scripts/ui/store");

    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.File({filename: 'logging.log'})
        ]
    });

    app.all('*', function(request, response, next) {
        const date = new Date();
        const isAPI = request.url.search( /api/i );

        logger.log({
            level: 'info',
            url: request.url,
            date: date.toISOString()
        });

        if (isAPI == -1) {
            const context = {};

            const html = ReactDOMServer.renderToString(
                <Provider store={store.default}>
                    <StaticRouter location={request.url} context={context}>
                        <UIRouter />
                    </StaticRouter>
                </Provider>
            );

            response.render('meow', {entry: html});
        } else {
            next();
        }
    });

    app.use('/api/blogs', PostRouter);
    app.use('/api', UserPouter);
}

module.exports = ApplicationRouter;