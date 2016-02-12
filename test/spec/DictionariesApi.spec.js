var DictionariesApi = require('../../app/DictionariesApi');
var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var expect = chai.expect;
var buildReqRespMock = require('../helpers/reqRespMock');
require('sinon-as-promised');
var AsyncCheck = require('../helpers/AsyncCheck');
var finallyDone = require('../helpers/finallyDone');


describe('DictionariesApi', function() {

    beforeEach(function() {
        this.fakeActions = {};
        this.fakeActions.createOrUpdate = sinon.stub();
        this.fakeActions.show = sinon.stub();

        this.dictionariesApi = new DictionariesApi(this.fakeActions);
		this.reqRespMock = buildReqRespMock();

        this.reqRespMock.req.params = {
            scope: 'users',
            uuid: 'uuid',
            name: 'dictionary name'
        };
    });

    it('should exists', function() {
        expect(this.dictionariesApi).to.not.be.undefined;
    });

    describe('put', function() {

        beforeEach(function(){
            this.reqRespMock.res.sendStatus = function(values){};
            this.reqRespMock.res.json = function(values){};
        });

        it('should return 200', function(done) {
            this.fakeActions.createOrUpdate.resolves('foo');

            this.reqRespMock.res.sendStatus = function(values) {

                var myCheck = function(arg) {
                    expect(arg).to.be.equal(200);
                };

                AsyncCheck.check(myCheck, values, done);
            };


            this.dictionariesApi.update(this.reqRespMock.req, this.reqRespMock.res);
        });


        it('should return the dictionary on the body', function(done) {
            var that = this;
            this.dictionary = {
                name: 'name',
                uuid: 'uuid',
                scope: 'user',
                content: 'content'
            };

            this.fakeActions.createOrUpdate.resolves(this.dictionary);
            this.reqRespMock.res.json = function(values) {

                var myCheck = function(arg) {
                    expect(arg).to.be.equal(that.dictionary);
                };

                AsyncCheck.check(myCheck, values, done);
            };

            this.dictionariesApi.update(this.reqRespMock.req, this.reqRespMock.res);
        });

        it('should return error when promise not resolved', function(done){
            this.fakeActions.createOrUpdate.rejects('foo');

            this.reqRespMock.res.send = function(values) {

                var myCheck = function(arg) {
                    expect(arg).to.be.equal(500);
                };

                AsyncCheck.check(myCheck, values, done);
            };

            this.dictionariesApi.update(this.reqRespMock.req, this.reqRespMock.res);
        });


        it('should delegate to the action to update or create the dictionary', function(){
            this.fakeActions.createOrUpdate.resolves('foo');

            this.dictionariesApi.update(this.reqRespMock.req, this.reqRespMock.res);

            expect(this.fakeActions.createOrUpdate).to.be.calledWith('users','uuid', 'dictionary name');
        });
    });

    describe('get', function() {
        it('should return 404 when dictionary not found', function(done) {
            this.fakeActions.show.rejects('foo');

            this.reqRespMock.res.send = function(values) {

                var myCheck = function(arg) {
                    expect(arg).to.be.equal(404);
                };

                AsyncCheck.check(myCheck, values, done);
            };

            this.dictionariesApi.read(this.reqRespMock.req, this.reqRespMock.res);
        });

        it('should return 200 when dictionary found', function (done) {
            this.fakeActions.show.resolves('foo');

            this.reqRespMock.res.send = function(values) {

                var myCheck = function(arg) {
                    expect(arg).to.be.equal(201);
                };

                AsyncCheck.check(myCheck, values, done);
            };

            this.dictionariesApi.read(this.reqRespMock.req, this.reqRespMock.res);
        });

        it('should delegate to the action to get the specific dictionary', function(){
            this.fakeActions.show.resolves('foo');

            this.dictionariesApi.read(this.reqRespMock.req, this.reqRespMock.res);

            expect(this.fakeActions.show).to.be.calledWith('users','uuid', 'dictionary name');
        });
    });


    describe('list', function() {
        it('should return 404 when dictionary not found', function(done) {
            this.fakeActions.show.rejects('foo');

            this.reqRespMock.res.send = function(values) {

                var myCheck = function(arg) {
                    expect(arg).to.be.equal(404);
                };

                AsyncCheck.check(myCheck, values, done);
            };

            this.dictionariesApi.read(this.reqRespMock.req, this.reqRespMock.res);
        });

        it('should return 200 when dictionary found', function (done) {
            this.fakeActions.show.resolves('foo');

            this.reqRespMock.res.send = function(values) {

                var myCheck = function(arg) {
                    expect(arg).to.be.equal(201);
                };

                AsyncCheck.check(myCheck, values, done);
            };

            this.dictionariesApi.read(this.reqRespMock.req, this.reqRespMock.res);
        });

        it('should delegate to the action to get the specific dictionary', function(){
            this.fakeActions.show.resolves('foo');

            this.dictionariesApi.read(this.reqRespMock.req, this.reqRespMock.res);

            expect(this.fakeActions.show).to.be.calledWith('users','uuid', 'dictionary name');
        });
    });
});
