const express = require('express');
const router = require('./routes/ApplicationRouter.js');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const db = mongoose.connection;
const authorization = require('./authorization/authorization.js');

const port = 9000;

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mycollection');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected');
});

authorization(app);
router(app);

app.use(function(error, requset, response, next) {
    response.status(404).end({
        error: error
    });
});

app.listen(port);