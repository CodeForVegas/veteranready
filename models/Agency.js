var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Agency = new keystone.List('Agency', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Agency.add({
  name: { type: String, required: true, index: true },
  email: { type: Types.Email, initial: true, required: true, index: true },
  representative: { type: Types.CloudinaryImage, required: false, index: false },
  video: { type: Types.Url, initial: true, required: false, index: false },
  topic: { type: Types.Select, options: 'All, Education, Employment, Health and Welfare, Housing', default: 'All', initial: true, required: true, index: true },
  approved: { type: Types.Boolean, initial: true, index: true },
});

Agency.schema.pre('save', function(next) {
  console.log("RUNNING PRESAVE HOOK");
  var re = /https*:\/\/www.youtube.com\/watch\?v=(.*)$/
  if (this.video.match(re)) {
    this.video = this.video.replace("watch?v=", "embed/");
  }
  next();
});

Agency.defaultColumns = 'name, email, topic, approved';
Agency.register();
