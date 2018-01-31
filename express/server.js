const express = require('express');
const router = require('./api/routes.js');
const app = express();

const port = 9000;

app.set('view engine', 'pug');
router(app);

app.use(function(request, response) {
    response.status(404);
    response.render('index', {title: 'Hey', message: 'Hello!'});
});

app.listen(port);