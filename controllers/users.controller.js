const bcrypt = require('bcrypt');

const User = require('../models/user.model');

module.exports.renderRegisterPage = function (req, res) {
	res.render('users/register', { title: 'Register' });
};

module.exports.renderLoginPage = function (req, res) {
	res.render('users/login', { title: 'Login' });
};

module.exports.renderUserPage = function (req, res) {
	res.render('users/user', { title: 'User', user: res.locals.user });
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
					const newUser = new User({ username: username, email: email, password: hashPassword, type: 0 });
					newUser.save().then((user) => console.log(user));
					req.flash('msg-success', 'Register successfully!');
					res.location('/users/login');
					res.redirect('/users/login');
				})
			})
		}
	})
};

module.exports.logout = function (req, res) {
	req.logout();
	res.redirect('/');
};

module.exports.changePassword = function (req, res) {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(req.body.password, salt, (err, hashPassword) => {
			User.findOneAndUpdate({ email: res.locals.user.email }, { $set: { password: hashPassword } }, (err, user) => {
				if (err) throw err;
				if (user) {
					req.flash('msg-success', 'Change password successful!');
					res.location('/users');
					res.redirect('/users');
				}
			})
		})
	})
}