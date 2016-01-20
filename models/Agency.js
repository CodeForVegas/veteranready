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
  facebook: { type: Types.Url, required: false, index: false },
  linkedin: { type: Types.Url, required: false, index: false },
  googlePlus: { type: Types.Url, required: false, index: false },
  twitter: { type: Types.Url, required: false, index: false },
  youtube: { type: Types.Url, required: false, index: false },
  instagram: { type: Types.Url, required: false, index: false },
  wordpress: { type: Types.Url, required: false, index: false },
  logo: { type: Types.CloudinaryImage, autoCleanup: true, required: false, index: false },
  video: { type: Types.Url, initial: true, required: false, index: false },
  summary: { type: Types.Text, initial: true, required: true, index: true},
  description: { type: Types.Text, required: false, index: false },
  associateAgencies: { type: String, required: false, index: false },
  topic: { type: Types.Select, options: 'All, Education, Employment, Health and Wellness, Housing, Legal, Media, Networking and Referrals', default: 'All', initial: true, required: true, index: true },
  contactName: { type: String, initial: true, required: true, index: true },
  contactTitle: { type: String, required: false, index: false },
  contactPhoto: { type: Types.CloudinaryImage, autoCleanup: true, required: false, index: false },
  contactMilitaryService: { type: String, required: false, index: false },
  keywords: { type: String, required: false, index:true },
  approved: { type: Types.Boolean, initial: true, index: true },
  lastUpdated: { type: Types.Date, initial: true, index: true }
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

Agency.defaultColumns = 'name, email, topic, contactName, approved, lastUpdated';
Agency.register();
