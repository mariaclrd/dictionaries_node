var chai = require('chai')
var sinonChai = require('sinon-chai')
chai.use(sinonChai);
var expect = chai.expect;
require('sinon-as-promised');
var assert = chai.assert;
require('chai-as-promised');
var UserClient = require('../../../app/clients/UserClient')

describe('userClient', function() {
  
  var that = this;

  beforeEach(function() {
    
    this.body = '{bar:"foo"}';
    this.statusCode = 200;
    this.error = null;

    this.fakeOpts = {};
    this.fakeOpts.request = function(requestOpts, callback) {
      var response = {};
      response.statusCode = this.statusCode;
      response.body = that.body;
      callback(that.error, response, '{jaja:"foo"}');
    };

    this.fakeOpts.config = {};
    this.fakeOpts.config.url = 'my url';

    this.fakeSession = 'my cookie'

    this.userClient = new UserClient(this.fakeOpts);
  });

  it('should exists', function() {
    expect(this.userClient).to.not.be.undefined;
  });

  describe('findByCookie', function() {

    describe('The promise is fulfilled', function() { 

      it('should return body when promise is resolved', function(done) {
        promise = this.userClient.findByCookie(this.fakeSession);

        promise.then( function(value) {
          try {
              assert.equal(value, that.body);
              done();
            } catch (error) {
              done(error);
            }
        }, function(error) {
          console.log(error);
          done(error);
        });
      });
    });

    describe('The promise is rejected', function() { 
      before(function () {

        this.error = '{error:"Mi ErRoR rEsHuLoN"}';

        this.userClient = new UserClient(this.fakeOpts);
      });

      it('should return error when promise not resolved', function(done) {
        promise = this.userClient.findByCookie(this.fakeSession);

        promise.then( function(value) {
          done('is calling success and it should not');
        }, function(err) {
          try {
              assert.equal(err, that.error);
              done();
            } catch (err) {
              done(err);
            }
        });
      });
    });
  });
});
