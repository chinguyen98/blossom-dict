const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user.model');

module.exports.ensureAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/users/login');
}

module.exports.authentication = passport.authenticate('local', {
	successRedirect: '/users',
	failureRedirect: '/users/login',
	failureFlash: 'Incorrect username or password',
	successFlash: 'Welcome!'
});

passport.serializeUser(function (user, done) {
	return done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, (err, user) => {
		done(err, user);
	})
});

passport.use(new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
	User.findOne({ email: username }, (err, user) => {
		if (err) { return done(err) };
		if (!user) {
			return done(null, false);
		}
		bcrypt.compare(password, user.password, (err, res) => {
			if (err) throw err;
			if (!res)
				return done(null, false);
			return done(null, user);
		})
	})
}))