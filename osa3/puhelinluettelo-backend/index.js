const express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	morgan = require('morgan'),
	Item = require('./models/item'),
	api = require('./api');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('build'));

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'));

app.use('/api', api);

app.get('/info', (req, res) => {
	Item.count().then(count => {
		res.send(`
			<p>Puhelinluettelossa on ${count} henkilön tiedot</p>
			<p>${new Date()}</p>
				`);
	});
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});