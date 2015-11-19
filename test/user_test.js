process.env.NODE_ENV = process.env.NODE_ENV || 'test';
require('dotenv').load();

var keystone = require('keystone');
var chai = require('chai');
var mongoose = require('mongoose');
var dbURI = process.env.MONGO_URL

keystone.init({
  'name': 'User Model Test'
});

var User = null;
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
