const router = require('express').Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

router.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', {title: 1, author: 1});

	response.json(users.map(User.format));
});

router.post('/', async (request, response) => {
	try {
		const body = request.body;

		if(body.username.length <= 3) {
			return response.status(400).json({error: 'username needs to be 3 characters or more'});
		}

		const saltRounds = 10
		const passwordHash = await bcrypt.hash(body.password, saltRounds)

		const user = new User({
			username: body.username,
			name: body.name,
			passwordHash,
			adult: body.adult === undefined ? true : body.adult
		});

		const savedUser = await user.save();

		response.status(201).json(User.format(savedUser));
	} catch (exception) {
		if(exception.code === 11000) {
			response.status(400).json({error: 'username already in use'});
		} else {
			console.log(exception);
			response.status(500).json({ error: 'something went wrong...' });
		}
	}
});

module.exports = router;