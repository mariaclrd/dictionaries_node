var request = require('supertest');
var application = require('../../../app/expressApp');
var chai = require('chai');
var expect = chai.expect;
var Provider = require('../../../app/Provider');
var CirrusAuthMiddleware = require('@workshare/nodejs-cirrus-auth');
var sinon = require('sinon');

describe('integration', function () {

    beforeEach(function() {
        this.provider = new Provider();
        this.authStub = sinon.stub(CirrusAuthMiddleware.prototype, 'filter', function(_r, _rs, next) {
            next();
        });
        this.app = this.provider.expressApp();
    });

    afterEach(function(){
        this.authStub.restore();
    });

    describe ('GET /ping', function(){
        it('should return 200', function(done) {
            request(this.app)
                .get('/ping')
                .expect(200, done);
        });
    });

    describe.only('PUT /{scope}/{uuid}/dictionaries/{name}.json', function() {
        it('should return 200', function(done) {
            request(this.app)
                .put('/users/some-uuid/dictionaries/some-name.json')
                .expect(200)
                .end(done);

        });
    });
});
