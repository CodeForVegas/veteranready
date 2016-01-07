var keystone = require('keystone');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/veteran_ready';

// Query for all documents in a collection:

// Find all entries in agencies collection in veteran_ready db:
var findAgencies = function(db, callback) {
  var cursor = db.collection('agencies').find( );
  cursor.each(function(err, doc) {
    assert.equal(err, null);
    if (doc != null) {
      console.log(doc); // This will print all of the info about all of the agencies to the console
    } else {
      callback();
    }
  });
};

// Call the findAgencies function:
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  findAgencies(db, function() {
    db.close();
  });
});

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Set locals
	locals.section = 'resources';
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
	view.render('resources');

};
