const Blog = require('../models/blog');
const blogs = require('./data.json');

const nonExistingId = async () => {
	const blog = new Blog();
	await blog.save();
	await blog.remove();

	return blog._id.toString();
};

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map(Blog.format);
};

const randomBlog = async () => {
	const blog = await Blog.findOne({});
	return Blog.format(blog);
};

module.exports = {
	blogs, nonExistingId, blogsInDb, randomBlog
};