var request = require('supertest');
var application = require('../../../app/expressApp');
var chai = require('chai');
var expect = chai.expect;
var provider = require('../../../app/Provider');

describe('integration', function () {

    before(function() {
        var that = this;
        this.provider = new provider();
        this.app = that.provider.expressApp();
    });

    describe ('GET /ping', function(){
        it('should return 200', function(done) {
            request(this.app)
                .get('/ping')
                .expect(200, done);
        });
    });

    describe('PUT /{scope}/{uuid}/dictionaries/{name}.json', function() {
        it('should return 200', function(done) {
            request(this.app)
                .put('/users/some-uuid/dictionaries/some-name.json')
                .expect(200)
                .end(done);
        });
    });
});
