function PostRouter() {
    const express = require('express');
    const router = express.Router();
    const models = require('../models/models.js');
    const ReactDOMServer = require('react-dom/server');
    const React = require('react');
    const App  = require('../../scripts/ui/App');

    router.get('/', function(request, response) {
        const content = ReactDOMServer.renderToString(<App />);
        response.render('meow', {entry: content});
    });

    router.post('/', function(request, response) {

        const postModel = new models.post({
            author: request.body.author,
            description: request.body.description,
            publishedAt: request.body.publishedAt,
            title: request.body.title,
            url: request.body.url,
            urlToImage: request.body.urlToImage
        });

        postModel.save(function(error, result) {
            if (error) {
                response.send(error);
            } else {
                response.send(result);
            }
        });
    });

    router.get('/:id', function(request, response) {
        const id = request.params.id;

        models.post.findOne({_id: id}, function(error, result) {
            if (error) {
                response.send(error);
            } else {
                response.send(result);
            }
        });
    });

    router.put('/:id', function(request, response) {
        const id = request.params.id;

        models.post.update({_id: id}, request.body, function(error, result) {
            if (error) {
                response.send(error);
            } else {
                response.send(result);
            }
        });
    });

    router.delete('/:id', function(request, response, next) {
        const id = request.params.id;

        models.post.remove({_id: id}, function(error, result) {
            if (error) {
                response.send(error);
            } else {
                response.send(result);
            }
        });
    });

    return router;
}

module.exports = PostRouter();