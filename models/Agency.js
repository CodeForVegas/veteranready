var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Agency = new keystone.List('Agency', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Agency.add({
  name: { type: String, required: true, index: true },
  website: { type: Types.Url, required: false, index: false },
  email: { type: Types.Email, initial: true, required: true, index: true },
  address: { type: Types.Location, required: false, defaults: { state: 'Nevada' } },
  phone: { type: String, initial: true, required: false, index: false},
  socialMedia: { type: Types.Url, required: false, index: false },
  logo: { type: Types.CloudinaryImage, required: false, index: false },
  video: { type: Types.Url, initial: true, required: false, index: false },
  summary: { type: Types.Text, initial: true, required: true, index: true},
  description: { type: Types.Text, required: false, index: false },
  associateAgencies: { type: String, required: false, index: false },
  topic: { type: Types.Select, options: 'All, Education, Employment, Health and Wellness, Housing, Legal, Media, Networking and Referrals', default: 'All', initial: true, required: true, index: true },
  contactName: { type: String, initial: true, required: true, index: true },
  contactTitle: { type: String, required: false, index: false },
  contactPhoto: { type: Types.CloudinaryImage, required: false, index: false },
  contactMilitaryService: { type: String, required: false, index: false },
  keywords: { type: String, required: false, index:true },
  approved: { type: Types.Boolean, initial: true, index: true },
});

Agency.schema.pre('save', function(next) {
  console.log("RUNNING PRESAVE HOOK");
  var youtube = /https*:\/\/www.youtube.com\/watch\?v=(.*)$/
  if (this.video.match(youtube)) {
    this.video = this.video.replace("watch?v=", "embed/");
  }
  next();
});

Agency.schema.pre('save', function(next) {
  console.log("RUNNING PRESAVE HOOK");
  var vimeo = /https*:\/\/vimeo.com\/(.*)$/
  if (this.video.match(vimeo)) {
    var urlParts = this.video.split('/');
    this.video = "https://player.vimeo.com/video/" + urlParts[urlParts.length-1];
  }
  next();
});

Agency.defaultColumns = 'name, email, address, summary, topic, contactName, approved';
Agency.register();
