const mongoose = require('mongoose');

if(process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const url = process.env.MONGODB_URI;

mongoose.connect(url);
mongoose.Promise = global.Promise;

const itemSchema = new mongoose.Schema({
	name: String,
	number: String
});

const _formatItem = (item) => {
	return {
		id: item._id,
		name: item.name,
		number: item.number
	};
};

itemSchema.statics.format = (items) => {
	if(Array.isArray(items)) {
		for(let i in items) {
			items[i] = _formatItem(items[i]);
		}
		return items;
	} else {
		return _formatItem(items);
	}
};

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
