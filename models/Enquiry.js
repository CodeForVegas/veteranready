var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Enquiry = new keystone.List('Enquiry', {
	nocreate: true,
	noedit: true
});

Enquiry.add({
	name: { type: Types.Name, required: true },
	group: { type: Types.Select, options: [
         { value: 'veteran', label: 'An Individual Veteran' },
         { value: 'representative', label: 'Representing a Business or Organization'}
	] },
  email: { type: Types.Email, required: true, match: /.+@.+\..+/, lowercase: true },
	phone: { type: Types.Text},
	// match: /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/ },
	enquiryType: { type: Types.Select, options: [
		{ value: 'services', label: 'Our Services' },
		{ value: 'events', label: 'Post an Event' },
		{ value: 'resources', label: 'Share a Resource' },
		{ value: 'mentorship', label: 'Mentorship or Apprenticeship Opportunities' },
		{ value: 'other', label: 'Something Else' }
	] },
	message: { type: Types.Textarea, required: true },
	createdAt: { type: Date, default: Date(Date.now()) }
});

Enquiry.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	next();
});

Enquiry.schema.post('save', function() {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Enquiry.schema.methods.sendNotificationEmail = function(callback) {

	if ('function' !== typeof callback) {
		callback = function() {};
	}

	var enquiry = this;

	keystone.list('User').model.find().where('isAdmin', true).exec(function(err, admins) {

		if (err) return callback(err);

		new keystone.Email('enquiry-notification').send({
			to: admins,
			from: {
				name: 'Veteran Ready',
				email: 'contact@veteran-ready.com'
			},
			subject: 'New Enquiry for Veteran Ready',
			enquiry: enquiry
		}, callback);

	});

};

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();
