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
    topic: "All",
    contactName: "Jane Contact",
    approved: true,
    lastUpdated: "2016-01-03"
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
    agency.should.have.property('topic');
    agency.should.have.property('contactName');
    agency.should.have.property('approved');
    agency.should.have.property('lastUpdated');
    done();
  });

  it("should register a new agency", function(done){
    Agency.should.have.property('register').be.a('Function');
    Agency.register("Next Agency", "nextagency@test.com", "All", "Jane Contact", true, "2016-01-03", function(nextAgency) {
      nextAgency.name.should.equal("Next Agency");
      nextAgency.email.should.equal("nextagency@test.com");
      nextAgency.topic.should.equal("All");
      nextAgency.contactName.should.equal("Jane Contact");
      nextAgency.approved.should.equal(true);
      nextAgency.lastUpdated.should.equal("2016-01-03");
      done();
    })
    done();
  });

});
