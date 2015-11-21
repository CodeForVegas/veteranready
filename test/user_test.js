process.env.NODE_ENV = process.env.NODE_ENV || 'test';
require('dotenv').load();

var keystone = require('keystone');
var chai = require('chai');
var mongoose = require('mongoose');
var dbURI = process.env.MONGO_URL

keystone.init({
  'name': 'User Model Test'
});

var User;
keystone.import('../models');
chai.should();

describe('Users', function() {
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
});

describe('User', function() {
  var user = {
    name: "Test User",
    email: "user@test.com",
    password: "admin",
    isAdmin: true
  };
  it('should be valid', function(done) {
    user.should.have.property('name', 'Test User');
    user.should.have.property('email', 'user@test.com');
    user.should.have.property('password', 'admin');
    user.should.have.property('isAdmin', true);
    done();
  });
  /*
  it('has a name', function(done) {
    //
    done();
  });

  it('has a valid email', function(done) {
    //
    done();
  });
  */
});
