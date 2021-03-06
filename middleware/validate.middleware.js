module.exports.validateRegisterForm = function (req, res, next) {
	let errors = [];
	if (!req.body.username) {
		errors.push('Username field is required!');
	}
	if (!req.body.email) {
		errors.push('Email field is required!');
	}
	if (!req.body.password) {
		errors.push('Password field is required!');
	}
	if (!req.body.confirmPassword) {
		errors.push('ConfirmPassword field is required!');
	}
	if (req.body.password !== req.body.confirmPassword) {
		errors.push('Confirm password not match!');
	}

	if (errors.length) {
		res.render('users/register', { title: 'Register', errors: errors, userInput: req.body });
		return;
	}

	next();
};

module.exports.validateChangePasswordForm = function (req, res, next) {
	let errors = [];
	if (!req.body.password) {
		errors.push('Password field is required!');
	}
	if (!req.body.confirmPassword) {
		errors.push('ConfirmPassword field is required!');
	}
	if (req.body.password !== req.body.confirmPassword) {
		errors.push('Confirm password not match!');
	}

	if (errors.length) {
		res.render('users/user', { title: 'User', errors: errors, user: res.locals.user });
		return;
	}

	next();
}

module.exports.validateAddFlowerForm = function (req, res, next) {
	let errors = [];
	if (!req.body.name) {
		errors.push('Flower name field is required!');
	}
	if (!req.body.definition) {
		errors.push('Flower definition field is required!');
	}
	if (!req.body.appearance) {
		errors.push('Flower appearance fieldn is required!');
	}
	if (!req.body.meaning) {
		errors.push('Flower meaning field is required!');
	}

	if (errors.length) {
		res.render('users/user', { title: 'User', errors: errors, user: res.locals.user, userInput: req.body });
		return;
	}

	next();
}