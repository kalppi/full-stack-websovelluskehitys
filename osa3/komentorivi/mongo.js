const mongoose = require('mongoose');

const url = 'mongodb://fullstack:salasana@ds115198.mlab.com:15198/puhelinluettelo';

mongoose.connect(url)
mongoose.Promise = global.Promise;

const Item = mongoose.model('Item', {
  name: String,
  number: String
});

if(process.argv.length >= 4) {
	const name = process.argv[2];
	const number = process.argv[3];

	const item = new Item({name, number});

	item.save().then(r => {
		console.log(`lisätään henkilö ${r.name} numero ${r.number} luetteloon`);

		mongoose.connection.close();
	});
} else {
	console.log('puhelinluettelo:');

	Item.find({}).then(results => {
		if(results.length == 0) {
			console.log('ei nimiä');
		} else {
			results.forEach(r => {
				console.log(`   ${r.name} ${r.number}`);
			});
		}

		mongoose.connection.close();
	});
}