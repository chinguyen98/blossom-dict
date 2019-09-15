const bcrypt = require('bcrypt');

const User = require('../models/user.model');

module.exports.renderRegisterPage = function (req, res) {
	res.render('users/register', { title: 'Register' });
};

module.exports.renderLoginPage = function (req, res) {
	res.render('users/login', { title: 'Login' });
};

module.exports.renderUserPage = function (req, res) {
	res.render('users/user', { title: 'User' })
}

module.exports.registerUser = function (req, res) {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email: email }, (err, user) => {
		if (err) throw err;
		if (user) {
			req.flash('msg-valid-err', 'Email already exists!');
			res.location('/users/register');
			res.redirect('/users/register');
		} else {
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(password, salt, (err, hashPassword) => {
					const newUser = new User({ username: username, email: email, password: hashPassword });
					newUser.save().then((user) => console.log(user));
					req.flash('msg-success', 'Register successfully!');
					res.location('/users/login');
					res.redirect('/users/login');
				})
			})
		}
	})
};