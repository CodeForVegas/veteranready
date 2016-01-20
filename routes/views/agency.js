var keystone = require('keystone');
var cloudinary = require('cloudinary');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'agency';
	locals.filters = {
		agency: req.params.agency
	};
	locals.data = {
		agencies: []
	};

	// Load the current agency
	view.on('init', function(next) {

		var q = keystone.list('Agency').model.find({
      approved: true
		})

		q.exec(function(err, result) {
			locals.data.agency = result;
			next(err);
		});

	});

	// Render the view
	view.render('agency');

};
