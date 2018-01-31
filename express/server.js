let express = require('express');
let router = require('./api/routes.js');
let app = express();

const port = 9000;

app.set('view engine', 'pug');
router(app);

app.use(function(request, response) {
    response.status(404);
    response.render('index', {title: 'Hey', message: 'Hello!'});
});

app.listen(port);