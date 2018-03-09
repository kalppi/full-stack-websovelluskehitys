const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	text: String,
	blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }
});

const _formatItem = (item) => {
	return {
		id: item._id,
		text: item.text,
		blog: item.blog
	};
};

commentSchema.statics.format = (items) => {
	if(Array.isArray(items)) {
		for(let i in items) {
			items[i] = _formatItem(items[i]);
		}
		return items;
	} else {
		return _formatItem(items);
	}
};

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
