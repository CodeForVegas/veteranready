process.env.NODE_ENV = process.env.NODE_ENV || 'test';
require('dotenv').load();

var keystone = require('keystone');
var chai = require('chai');
var mongoose = require('mongoose');
var dbURI = process.env.MONGO_URL

keystone.init({
  'name': 'Enquiry Model Test'
});

var Enquiry = new keystone.List('Enquiry');
keystone.import('../models');
chai.should();

describe('Enquiries', function() {

  var enquiry = {
    name: "Test Enquiry",
    group: "veteran",
    email: "enquiry@test.com",
    phone: "(123)456-7890",
    enquiryType: "other",
    message: "Test enquiry message",
    createdAt: Date(Date.now())
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
    Enquiry = keystone.list('Enquiry');
    Enquiry.should.be.a('Object');
    Enquiry.should.have.property('model').be.a('Function');
    Enquiry.should.have.property('schema').be.a('Object');
    done();
  });

  it('should be a valid enquiry', function(done) {
    enquiry.should.be.a('Object');
    enquiry.should.have.property('name');
    enquiry.should.have.property('group');
    enquiry.should.have.property('email');
    enquiry.should.have.property('phone');
    enquiry.should.have.property('enquiryType');
    enquiry.should.have.property('message');
    enquiry.should.have.property('createdAt');
    enquiry.createdAt.should.equal(Date(Date.now()));
    done();
  });

  it("should register a new enquiry", function(done){
    Enquiry.register("Next Enquiry", "nextenquiry@test.com", "other", Date(Date.now()), function(nextEnquiry) {
      nextEnquiry.name.should.equal("Next Enquiry");
      nextEnquiry.email.should.equal("nextenquiry@test.com");
      nextEnquiry.enquiryType.should.equal("other");
      nextEnquiry.createdAt.should.equal(Date(Date.now()));
      done();
    })
    done();
  });

});
