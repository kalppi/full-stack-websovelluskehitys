const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const middleware = require('./utils/middleware');

const config = require('./utils/config');

const app = express();

const log = middleware.log;

mongoose.connect(config.mongoUrl)
	.then( () => {
		log('connected to database', config.mongoUrl);
	});

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.logger);
app.use(middleware.extractToken);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.error);

const server = http.createServer(app);

server.listen(config.port, () => {
	log(`Server running on port ${config.port}`);
});

server.on('close', () => {
	mongoose.connection.close();
});

module.exports = {
	app, server
};