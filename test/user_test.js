process.env.NODE_ENV = process.env.NODE_ENV || 'test';
require('dotenv').load();

var keystone = require('keystone');
var chai = require('chai');
var mongoose = require('mongoose');
var dbURI = process.env.MONGO_URL

keystone.init({
  'name': 'User Model Test'
});

var User = new keystone.List('User');
keystone.import('../models');
chai.should();

describe('Users', function() {

  var user = {
    name: "Test User",
    email: "user@test.com",
    password: "admin",
    isAdmin: true
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
    User = keystone.list('User');
    User.should.be.a('Object');
    User.should.have.property('model').be.a('Function');
    User.should.have.property('schema').be.a('Object');
    done();
  });

  it('should be a valid user', function(done) {
    user.should.be.a('Object');
    user.should.have.property('name');
    user.should.have.property('email');
    user.should.have.property('password');
    user.should.have.property('isAdmin');
    done();
  });

  it("should register a new user", function(done){
    User.should.have.property('register').be.a('Function');
    User.register("Next User", "nextuser@test.com", "password", false, function(nextUser) {
      nextUser.name.should.equal("Next User");
      nextUser.email.should.equal("nextuser@test.com");
      nextUser.password.should.equal("password");
      nextUser.isAdmin.should.equal(false);
      done();
    })
    done();
  });

});
