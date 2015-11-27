var chai = require('chai')
var sinonChai = require('sinon-chai')
chai.use(sinonChai);
var expect = chai.expect;
require('sinon-as-promised');
var assert = chai.assert;
require('chai-as-promised');
var UserClient = require('../../../app/clients/UserClient')

describe('userClient', function() {
  beforeEach(function() {
    var body = 'My wonderful body'
    var fakeOpts = {};
    fakeOpts.request = function(requestOpts, callback) {
      var response = {};
      response.statusCode = 200;
      response.body = this.body;
      callback(null, response, 'jaja');
    };
    fakeOpts.config = {};
    fakeOpts.config.url = 'my url';

    var fakeSession = 'my cookie'

    this.userClient = new UserClient(fakeOpts);
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
              assert.equal(value, this.body);
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
        var that = this;
        this.error = 'Mi ErRoR rEsHuLoN';
        this.body = 'My wonderful body';

        var fakeOpts = {};
        fakeOpts.request = function(requestOpts, callback) {
          var response = {};
          response.statusCode = 200;
          response.body = this.body;
          callback(that.error, response, 'jaja');
        };

        fakeOpts.config = {};
        fakeOpts.config.url = 'my url';

        var fakeSession = 'my cookie'

        this.userClient = new UserClient(fakeOpts);
      });

      it('should return error when promise not resolved', function(done) {
        var that = this;

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
