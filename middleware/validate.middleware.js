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
}