function ApplicationRouter(app) {
    const express = require('express');
    const fs = require('fs');
    const constants = require('../constants.js');
    const winston = require('winston');
    const router = express.Router();

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

    router.get('/blogs', function(request, response) {
        response.writeHead(200, {'Content-Type': 'application/json'});

        response.end(function() {
            fs.readFile('message.txt', function(err, data) {
                if (err) throw err;
                console.log(JSON.parse(data));
            });
        });
    });

    router.post('/blogs', function(request, response) {
        response.writeHead(200, {'Content-Type': 'application/json'});

        response.end(function() {
            fs.writeFile('message.txt', JSON.stringify(constants.defaultPostArray), function(err) {
                if (err) throw err;
            });
        });
    });

    router.get('/blogs/:id', function(request, response, next) {
        const id = request.params.id;

        fs.readFile('message.txt', function(err, data) {
            if (err) throw err;
            const fileData = JSON.parse(data);

            if (fileData[id]) {
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end(function() {
                    console.log(fileData[id]);
                });
            } else {
                next();
            }
        });
    });

    router.put('/blogs/:id', function(request, response, next) {
        const id = request.params.id;

        fs.readFile('message.txt', function(err, data) {
            if (err) throw err;
            let fileData = JSON.parse(data);

            fileData[id] = constants.newPost;
            response.writeHead(200, {'Content-Type': 'application/json'});

            response.end(function() {
                fs.writeFile('message.txt', JSON.stringify(fileData), function(err) {
                    if (err) throw err;
                    console.log(fileData[id]);
                });
            });
        });
    });

    router.delete('/blogs/:id', function(request, response, next) {
        const id = request.params.id;

        fs.readFile('message.txt', function(err, data) {
            if (err) throw err;
            let fileData = JSON.parse(data);

            delete fileData[id];
            response.writeHead(200, {'Content-Type': 'application/json'});

            response.end(function() {
                fs.writeFile('message.txt', JSON.stringify(fileData), function(err) {
                    if (err) throw err;
                    console.log(fileData[id]);
                });
            });
        });
    });

    app.use('/', router);
}

module.exports = ApplicationRouter;