process.env.NODE_ENV = process.env.NODE_ENV || 'test';
require('dotenv').load();

var keystone = require('keystone');
var chai = require('chai');
var mongoose = require('mongoose');
var dbURI = process.env.MONGO_URL

keystone.init({
  'name': 'PostCategory Model Test'
});

var PostCategory;
keystone.import('../models');
chai.should();

describe('PostCategories', function() {
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
    PostCategory = keystone.list('PostCategory');
    PostCategory.should.be.a('Object');
    PostCategory.should.have.property('model').be.a('Function');
    PostCategory.should.have.property('schema').be.a('Object');
    done();
  });
});
