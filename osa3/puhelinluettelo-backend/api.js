const express = require('express'),
	router = express.Router();

module.exports = (data) => {
	router.route('/persons')
		.get((req, res) => {
			res.send(data)
		})
		.post((req, res) => {
			const id = Math.round(Math.random() * 10000) + 10;
			const name = req.body.name;
			const number = req.body.number;;

			let error = null;

			if(name === undefined) {
				error = 'name is missing';
			} else if(number === undefined) {
				error = 'number is missing';
			} else {
				const item = data.find(e => e.name === name);

				if(item !== undefined) {
					error = 'name must be unique';
				} else {
					data.push({id, name, number});

					res.send({id, name, number});

					return;
				}
			}

			res.status(400).send({error});
		});

	router.route('/persons/:id')
		.get((req, res) => {
			const id = req.params.id;
			const item = data.find(e => e.id == id);

			if(item === undefined) {
				res.status(404).end();
			} else {
				res.send(item);
			}
		}).delete((req, res) => {
			const id = req.params.id;

			data = data.filter(e => e.id != id);

			res.send({message: 'deleted'});
		}).put((req, res) => {
			const id = req.body.id,
				name = req.body.name,
				number = req.body.number;

			const item = data.find(e => e.id == id);

			if(item === undefined) {
				res.status(404).end();
			} else {
				item.name = name;
				item.number = number;

				res.send({message: 'success'});
			}
		});

	return router;
};