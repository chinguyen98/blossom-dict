const Flower = require('../models/flower.model');

module.exports.renderFlowerDict = function (req, res) {
	Flower.find({}, (err, flowers) => {
		if (err) throw err;
		res.render('flowers/dict', { title: 'Flower Dictionary', flowerList: flowers });
	});
};

module.exports.renderFlowerDetail = function (req, res) {
	Flower.findById(req.params.id, (err, flower) => {
		if (err) throw err;
		else {
			res.render('flowers/flower', { title: 'Flower page', flower: flower });
		}
	});

}

module.exports.addFlower = function (req, res) {
	const name = req.body.name;
	const definition = req.body.definition;
	const appearance = req.body.appearance;
	const meaning = req.body.meaning;
	let picture;

	if (req.file) {
		console.log('File is uploading..!');
		picture = req.file.filename;
	} else {
		console.log('No image uploaded!');
		picture = 'No image!';
	}

	const flower = new Flower({
		name: name,
		definition: definition,
		appearance: appearance,
		meaning: meaning,
		picture: picture
	});

	flower.save().then((user) => {
		console.log(user);
		req.flash('msg-success', 'Add flower succesfully!');
		res.location('/users');
		res.redirect('/users');
	})
}