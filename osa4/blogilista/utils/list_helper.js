const _ = require('underscore');

const totalLikes = (blogs) => {
	return _.reduce(blogs, (likes, blog) => {
		return likes + blog.likes;
	}, 0);
};

const favoriteBlog = (blogs) => {
	let favorite = null, mostLikes = 0;

	blogs.forEach(blog => {
		if(blog.likes > mostLikes) {
			favorite = blog;
			mostLikes = blog.likes;
		}
	});

	return favorite;
};

const mostBlogs = (blogs) => {
	const max = _.chain(blogs)
		.countBy(blog => blog.author)
		.pairs()
		.max(_.last)
		.value();

	return {author: max[0], blogs: max[1]};
};

const mostLikes = (blogs) => {
	const max = _.chain(blogs)
		.reduce((acc, blog) => {
			if(!acc[blog.author]) {
				acc[blog.author] = 0;
			}

			acc[blog.author] += blog.likes;

			return acc;
		}, {})
		.pairs()
		.max(_.last)
		.value();

	return {author: max[0], likes: max[1]};
};

module.exports = {
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
};