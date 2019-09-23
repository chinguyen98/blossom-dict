
module.exports.userPage = function (handlebars) {
	handlebars.registerHelper('if_type', (a, b, c, options) => {
		if (a.type === b)
			return options.fn(a);
		return options.inverse(c);
	});
};