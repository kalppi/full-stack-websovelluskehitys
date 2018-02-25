const log = (...args) => {
	if (process.env.NODE_ENV !== 'test' ) {
		console.log.apply(console, args);
	}
};


const logger = (request, response, next) => {
	log('Method:', request.method);
	log('Path:  ', request.path);
	log('Body:  ', request.body);
	log('---');

	next();
};

const extractToken = (request, response, next) => {
	const authorization = request.get('authorization');
	
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		request.token = authorization.substring(7);
	} else {
		request.token = null;
	}

	next();
};

const error = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
	log,
	logger,
	error,
	extractToken
};