process.env.NODE_ENV = process.env.NODE_ENV || 'test';
require('dotenv').load();

var keystone = require('keystone');
var chai = require('chai');
var mongoose = require('mongoose');
var dbURI = process.env.MONGO_URL

keystone.init({
  'name': 'Gallery Model Test'
});

var Enquiry = new keystone.List('Enquiry');
keystone.import('../models');
chai.should();

describe('Galleries', function() {

  var gallery = {
    name: "Test Gallery",
    publishedDate: Date(Date.now()),
    heroImage: {},
    images: {}
  }

  beforeEach(function(done){
    if (keystone.mongoose.connection.db) return done();
    console.log('Connecting to ' + dbURI)
    keystone.mongoose.connect(dbURI, done);
  });

  it('should be connected to Mongo', function(done){
    keystone.mongoose.connection.db.should.be.a('Object');
    done();
  });

  it('should be a Mongoose Model', function(done) {
    Gallery = keystone.list('Gallery');
    Gallery.should.be.a('Object');
    Gallery.should.have.property('model').be.a('Function');
    Gallery.should.have.property('schema').be.a('Object');
    done();
  });

  it('should be a valid gallery', function(done) {
    gallery.should.be.a('Object');
    gallery.should.have.property('name');
    gallery.should.have.property('publishedDate');
    gallery.should.have.property('heroImage');
    gallery.should.have.property('images');
    done();
  });
});
