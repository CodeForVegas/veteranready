process.env.NODE_ENV = process.env.NODE_ENV || 'test';
require('dotenv').load();

var keystone = require('keystone');
var chai = require('chai');
var mongoose = require('mongoose');
var dbURI = process.env.MONGO_URL

keystone.init({
  'name': 'Agency Model Test'
});

var Agency = new keystone.List('Agency');
keystone.import('../models');
chai.should();

describe('Agencies', function() {

  var agency = {
    name: "Test Agency",
    email: "agency@test.com",
    representative: "http://res.cloudinary.com/dnar4muay/image/upload/h_300,w_300/mllby5kadaasbmjsltmf.jpg",
    video: "http://agencytest.com",
    topic: "All",
    approved: true
  };

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
    Agency = keystone.list('Agency');
    Agency.should.be.a('Object');
    Agency.should.have.property('model').be.a('Function');
    Agency.should.have.property('schema').be.a('Object');
    done();
  });

  it('should be a valid agency', function(done) {
    agency.should.be.a('Object');
    agency.should.have.property('name');
    agency.should.have.property('email');
    agency.should.have.property('representative');
    agency.should.have.property('video');
    agency.should.have.property('topic');
    agency.should.have.property('approved');
    done();
  });

  it("should register a new agency", function(done){
    Agency.should.have.property('register').be.a('Function');
    Agency.register("Next Agency", "nextagency@test.com", "http://res.cloudinary.com/dnar4muay/image/upload/h_300,w_300/mllby5kadaasbmjsltmf.jpg", "http://nextagency.com", "All", true, function(nextAgency) {
      nextAgency.name.should.equal("Next Agency");
      nextAgency.email.should.equal("nextagency@test.com");
      nextAgency.representative.should.equal("http://res.cloudinary.com/dnar4muay/image/upload/h_300,w_300/mllby5kadaasbmjsltmf.jpg");
      nextAgency.video.should.equal("http://nextagency.com");
      nextAgency.topic.should.equal("All");
      nextAgency.isAdmin.should.equal(true);
      done();
    })
    done();
  });

});
