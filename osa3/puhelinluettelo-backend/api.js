const express = require('express'),
	mongoose = require('mongoose'),
	Item = require('./models/item');

const router = express.Router();

router.route('/persons')
	.get((req, res) => {
		Item.find({})
			.then(Item.format)
			.then(results => {
				res.send(results);
		});
	})
	.post((req, res) => {
		const name = req.body.name.trim();
		const number = req.body.number.trim();

		const sendError = (error) => {
			res.status(400).send({error});
		};

		if(name === undefined) {
			sendError('name is missing');
		} else if(number === undefined) {
			sendError('number is missing');
		} else {
			Item.findOne({name: name}).then(item => {
				if(item !== null) {
					sendError('name must be unique');
				} else {
					const item = new Item({name, number});

					item.save()
						.then(Item.format)
						.then(i => {
							res.send(i);
						});
				}
			});
		}
	});

router.route('/persons/:id')
	.get((req, res) => {
		const id = req.params.id;

		if(!mongoose.Types.ObjectId.isValid(id)) {
			res.status(400).send({error: 'invalid id'});
		} else {
			Item.findById(id).then(item => {
				if(item === null) {
					res.status(404).end();
				} else {
					res.send(Item.format(item));
				}
			});
		}
	}).delete((req, res) => {
		const id = req.params.id;

		if(!mongoose.Types.ObjectId.isValid(id)) {
			res.status(400).send({error: 'invalid id'});
		}  else {
			Item.remove({_id: id}).then(() => {
				res.send({message: 'deleted'});
			});
		}
	}).put((req, res) => {
		const id = req.params.id,
			name = req.body.name,
			number = req.body.number;

		if(!mongoose.Types.ObjectId.isValid(id)) {
			res.status(400).send({error: 'invalid id'});
		}  else {
			Item.findOneAndUpdate({_id: id}, {name, number}).then(item => {
				if(item == null) {
					res.status(404).end()
				} else {
					res.send({message: 'success'});
				}
			});
		}
	});

module.exports = router;