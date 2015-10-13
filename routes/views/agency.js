var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Set locals
	locals.section = 'agency';
	locals.filters = {
		post: req.params.post
	};
	locals.data = {
		agency: []
	};
	
	// Load the current post
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