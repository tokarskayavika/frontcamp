const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var path = require("path");
const fs = require('fs');
const router = express.Router();

const port = 8081;

app.use(express.static(__dirname + '/scripts'));
app.use(express.static(__dirname + '/templates'));
app.use(express.static(__dirname + '/style'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(request, response, next) {
    const isAPI = request.url.search(/api/i);

    if (isAPI == -1) {
        response.sendFile(path.join(__dirname + '/index.html'));
    } else {
        next();
    }
});


app.get('/api/tasks', function(request, response) {
    fs.readFile('message.txt', function(err, data) {
        if (err) throw err;

        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(data);
    });
});

app.post('/api/add', function(request, response) {
    const task = request.body;

    fs.readFile('message.txt', function(err, data) {
        if (err) throw err;

        let fileData = data ? JSON.parse(data) : [];
        fileData.push(task);

        response.writeHead(200, {'Content-Type': 'application/json'});

        response.end(function() {
            fs.writeFile('message.txt', JSON.stringify(fileData), function(err) {
                if (err) throw err;
            });
        });
    });
});

app.delete('/api/:id', function(request, response, next) {
    const id = request.params.id;

    fs.readFile('message.txt', function(err, data) {
        if (err) throw err;
        let fileData = JSON.parse(data);

        delete fileData[id];
        response.writeHead(200, {'Content-Type': 'application/json'});

        response.end(function() {
            fs.writeFile('message.txt', JSON.stringify(fileData), function(err) {
                if (err) throw err;
            });
        });
    });
});

app.put('/api/:id', function(request, response, next) {
    const id = request.params.id;
    const body = request.body;

    fs.readFile('message.txt', function(err, data) {
        if (err) throw err;
        let fileData = JSON.parse(data);

        fileData[id] = body;
        response.writeHead(200, {'Content-Type': 'application/json'});

        response.end(function() {
            fs.writeFile('message.txt', JSON.stringify(fileData), function(err) {
                if (err) throw err;
            });
        });
    });
});

app.listen(port);