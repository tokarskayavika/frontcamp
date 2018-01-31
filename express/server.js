let express = require('express');
let file = require('./generated.json');
let fs = require('fs');
let winston = require('winston');

let app = express();
let router = express.Router();
const port = 9000;

app.set('view engine', 'pug');

const logger = winston.createLogger({
	level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logging.log' })
  ]
});

app.all('*', function (request, response, next) {
	let date = new Date();
	
	next();
	logger.log({
		level: 'info',
		url: request.url,
  		date: date.toISOString()
	});
});

router.get('/blogs', function(request, response) {
	response.writeHead(200, {'Content-Type': 'application/json'});
	response.end(JSON.stringify(file));
});

router.post('/blogs', function(request, response) {
	response.writeHead(200, {'Content-Type': 'application/json'});
	response.end(JSON.stringify(file));
});

router.get('/blogs/:id', function(request, response, next) {
	let id = request.params.id;
	
	if (file[id]) {
		response.writeHead(200, {'Content-Type': 'application/json'});
		response.end(JSON.stringify(file[id]));
	} else {
		next();
	}
});
	
router.put('/blogs/:id', function(request, response, next) {
	let id = request.params.id;
	
	if (file[id]) {
		response.writeHead(200, {'Content-Type': 'application/json'});
		response.end(JSON.stringify(file[id]));
	} else {
		next();
	}
});

router.delete('/blogs/:id', function(request, response, next) {
	let id = request.params.id;
	
	if (file[id]) {
		response.writeHead(200, {'Content-Type': 'application/json'});
		response.end(JSON.stringify(file[id]));
	} else {
		next();
	}
});

app.use('/', router);

app.use(function(request, response) {
	response.status(404);
	response.render('index', { title: 'Hey', message: 'Hello!' });
});

app.listen(port);