//const bcrypt = require('bcrypt');

const User = require('../models/user.model');

module.exports.renderRegisterPage = function (req, res) {
	res.render('users/register', { title: 'Register' });
};

module.exports.registerUser = function (req, res) {
	const username = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;

	// const hashPassword = createHashPassword(password);
	const newUser = new User({ username: username, email: email, password: password });
	newUser.save().then((user) => console.log(user));
}

// function createHashPassword(password) {
// 	bcrypt.genSalt(10, (err, salt) => {
// 		bcrypt.hash(password, salt, (err, hashPassword) => {
// 			if (err) throw err;
// 			return hashPassword;
// 		})
// 	})
// }