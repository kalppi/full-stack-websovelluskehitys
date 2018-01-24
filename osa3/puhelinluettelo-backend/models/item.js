const mongoose = require('mongoose')

const url = 'mongodb://fullstack:salasana@ds115198.mlab.com:15198/puhelinluettelo';

mongoose.connect(url)
mongoose.Promise = global.Promise

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
			items[i] = _formatItem(items[i]);
		}
		return items;
	} else {
		return _formatItem(items);
	}
};

const Item = mongoose.model('Item', itemSchema);

module.exports = Item
