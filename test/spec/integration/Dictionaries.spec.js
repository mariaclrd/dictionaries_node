var request = require('supertest');
var application = require('../../../app/expressApp');
var chai = require('chai');
var expect = chai.expect;
var provider = require('../../../app/Provider');

describe('integration', function () {

    before(function() {
        this.app = provider.expressApp;
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