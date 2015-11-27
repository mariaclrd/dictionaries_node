var DictionariesApi = require('../../app/DictionariesApi');
var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var Q = require('q');
var expect = chai.expect;
var reqRespMock = require('../helpers/reqRespMock');
require('sinon-as-promised')(Q);
var AsyncCheck = require('../helpers/AsyncCheck');


describe('DictionariesApi', function() {

    beforeEach(function() {
        var self = this;

        this.fakeActions = {};
        this.fakeActions.createOrUpdate = sinon.stub();
        this.fakeActions.show = sinon.stub();

        this.dictionariesApi = new DictionariesApi(this.fakeActions);

        reqRespMock.req.params = {
            scope: 'test_scope',
            uuid: 'uuid',
            name: 'dictionary name'
        };
    });

    it('should exists', function() {
        expect(this.dictionariesApi).to.not.be.undefined;
    });

    describe('put', function() {

        it('should return 200', function(done) {

            this.fakeActions.createOrUpdate.resolves('foo');

            reqRespMock.res.send = function(values) {

                var myCheck = function(arg) {
                    expect(arg).to.be.equal(200);
                };

                AsyncCheck.check(myCheck, values, done);
            };

            this.dictionariesApi.update(reqRespMock.req, reqRespMock.res);
        });

        it.only('should return error when promise not resolved', function(done){
            this.fakeActions.createOrUpdate.rejects('foo');

            reqRespMock.res.send = function(values) {

                var myCheck = function(arg) {
                    expect(arg).to.be.equal(500);
                };

                AsyncCheck.check(myCheck, values, done);
            };

            this.dictionariesApi.update(reqRespMock.req, reqRespMock.res);
        });


        it('should delegate to the action to update or create the dictionary', function(){
            this.fakeActions.createOrUpdate.resolves('foo');

            this.dictionariesApi.update(reqRespMock.req, reqRespMock.res);

            expect(this.fakeActions.createOrUpdate).to.be.calledWith('test_scope','uuid', 'dictionary name');
        });
    });

    describe('get', function() {
        it('should return 404 when dictionary not found', function() {
            this.fakeActions.show.rejects('foo');

            reqRespMock.res.send = function(values) {

                var myCheck = function(arg) {
                    expect(arg).to.be.equal(404);
                };

                AsyncCheck.check(myCheck, values, done);
            };

            this.dictionariesApi.read(reqRespMock.req, reqRespMock.res);
        });

        it('should return 200 when dictionary found', function () {
            this.fakeActions.show.resolves('foo');

            reqRespMock.res.send = function(values) {

                var myCheck = function(arg) {
                    expect(arg).to.be.equal(200);
                };

                AsyncCheck.check(myCheck, values, done);
            };

            this.dictionariesApi.read(reqRespMock.req, reqRespMock.res);



            //expect(true).to.be.false;

        });
    });
});