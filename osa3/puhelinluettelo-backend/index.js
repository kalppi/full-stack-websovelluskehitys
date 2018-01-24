const express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	morgan = require('morgan'),
	api = require('./api');

const app = express();

app.use(cors())
app.use(bodyParser.json());

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'));

const data = [{
	id: 1,
	name: 'Pertti',
	number: '555-12345'
}, {
	id: 2,
	name: 'Matti',
	number: '555-53421'
}, {
	id: 3,
	name: 'Pera',
	number: '555-23522'
}];

app.use('/', api(data));

app.get('/info', (req, res) => {
	res.send(`
<p>Puhelinluettelossa on ${data.length} henkilön tiedot</p>
<p>${new Date()}</p>
		`);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});