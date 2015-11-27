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
/* We want to be able to select multiple options from the list of topics, but Types.Select only allows one.
  http://keystonejs.com/docs/database/#relationships
  http://keystonejs.com/docs/database/#relationship-fields
  topic: { type: Types.Relationship, label: 'Topics', ref: 'Post', many: true },
  topic: { type: Types.Relationship, ref: 'existingModel', filters: { group: ':relevantGroup' } }

  https://docs.mongodb.org/manual/tutorial/model-data-for-keyword-search/#model-data-to-support-keyword-search
  https://docs.mongodb.org/manual/core/index-multikey/#multikey-indexes
  https://docs.mongodb.org/getting-started/node/query/#find-or-query-data-with-node-js
*/
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
