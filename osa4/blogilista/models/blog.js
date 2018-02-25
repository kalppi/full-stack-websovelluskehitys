const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const _formatItem = (item) => {
	return {
		id: item._id,
		title: item.title,
		author: item.author,
		url: item.url,
		likes: item.likes,
		user: item.user
	};
};

blogSchema.statics.format = (items) => {
	if(Array.isArray(items)) {
		for(let i in items) {
			items[i] = _formatItem(items[i]);
		}
		return items;
	} else {
		return _formatItem(items);
	}
};

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
