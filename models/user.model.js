const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('Connect database successfully!');
});

const userSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	flowerList: Array,
	pickList: Array
});

const User = mongoose.model('user', userSchema);

module.exports = User;
