const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {type: String, unique: true},
	passwordHash: String,
	name: String,
	adult: Boolean,
	blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
});

const _formatItem = (item) => {
	return {
		id: item._id,
		username: item.username,
		passwordHash: item.passwordHash,
		name: item.name,
		adult: item.adult,
		blogs: item.blogs
	};
};

userSchema.statics.format = (items) => {
	if(Array.isArray(items)) {
		for(let i in items) {
			items[i] = _formatItem(items[i]);
		}
		return items;
	} else {
		return _formatItem(items);
	}
};

const User = mongoose.model('User', userSchema);

module.exports = User;
