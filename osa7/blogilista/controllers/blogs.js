const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')


router.get('/', async (request, response) => {
	const blogs = await Blog.find({})
		.populate('user', {name: 1, username: 1})
		.populate('comments');

	response.json(blogs.map(Blog.format));
});

router.get('/:id', async (request, response) => {
	const id = request.params.id;

	if(!mongoose.Types.ObjectId.isValid(id)) {
		response.status(400).send({error: 'invalid id'});
	}  else {
		const blog = await Blog.findOne({_id: id});

		response.json(Blog.format(blog));
	}
});

router.post('/', async (request, response) => {
	const body = request.body;

	try {
		const token = request.token;
		const decodedToken = jwt.verify(token, process.env.SECRET);

		if (!token || !decodedToken.id) {
			return response.status(401).json({ error: 'token missing or invalid' });
		}

		if(body.title === undefined
			|| body.author === undefined
			|| body.url === undefined) {
			
			return response.status(400).json({error: 'missing fields'});
		}

		const user = await User.findById(decodedToken.id);

		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes === undefined ? 0 : body.likes,
			user: user._id
		});

		const result = await blog.save();

		Blog.populate(result, 'user', {name: 1, username: 1});

		user.blogs = user.blogs.concat(result._id);
		await user.save();

		response.status(201).json(Blog.format(result));
	} catch(exception) {
		if (exception.name === 'JsonWebTokenError' ) {
			response.status(401).json({ error: exception.message })
		} else {
			console.log(exception)
			response.status(500).json({ error: 'something went wrong...' })
		}
	}
});

router.delete('/:id', async (request, response) => {
	const id = request.params.id;
	
	if(!mongoose.Types.ObjectId.isValid(id)) {
		response.status(400).send({error: 'invalid id'});
	}  else {
		const token = request.token;
		const decodedToken = jwt.verify(token, process.env.SECRET);

		if (!token || !decodedToken.id) {
			return response.status(401).json({ error: 'token missing or invalid' });
		}

		const blog = await Blog.findById(id).populate('user', {_id: 1});
		const allowDelete = !blog.user || (blog.user._id.toString() === decodedToken.id.toString());

		if(allowDelete) {
			await Blog.remove({_id: id});
			
			response.send({message: 'deleted'});
		} else {
			response.status(401).json({error: 'cannot remove block'});
		}
	}
});

router.put('/:id', async (request, response) => {
	const id = request.params.id,
		author = request.body.author,
		url = request.body.url,
		likes = request.body.likes,
		title = request.body.title;

	if(!mongoose.Types.ObjectId.isValid(id)) {
		response.status(400).send({error: 'invalid id'});
	}  else {
		const blog = await Blog.findOneAndUpdate({_id: id}, {author, url, likes, title})
			.populate('user', {name: 1, username: 1});
		
		if(blog === null) {
			response.status(404).end();
		} else {
			response.json(Blog.format(blog));
		}
	}
});

router.post('/:id/comments', async (request, response) => {
	const id = request.params.id,
		text = request.body.text;

	if(!mongoose.Types.ObjectId.isValid(id)) {
		response.status(400).send({error: 'invalid id'});
	}  else {
		if(text === undefined) {
			return response.status(400).json({error: 'missing fields'});
		}

		const blog = await Blog.findById(id);

		const comment = new Comment({
			text: text,
			blog: id
		});

		const result = await comment.save();

		blog.comments = blog.comments.concat(result._id);
		await blog.save();

		response.status(201).json(result);
	}
});

module.exports = router;