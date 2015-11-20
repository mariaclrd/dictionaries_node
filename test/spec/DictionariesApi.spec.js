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

        it.only('should return 200', function(done) {

            this.fakeActions.createOrUpdate.resolves('foo');

            reqRespMock.res.send = function(arg) {
                AsyncCheck.check(function(arg) {
                    expect(arg).to.be.equal(200);
                }, arg, done);
            };

            this.dictionariesApi.update(reqRespMock.req, reqRespMock.res);
        });

        it('should return error when promise not resolved', function(done){
            this.fakeActions.createOrUpdate.rejects('foo');

            reqRespMock.res.send = function(value) {
                expect(value).to.equal(500);
                done();
            };

            this.dictionariesApi.update(reqRespMock.req, reqRespMock.res);
        })


        it('should delegate to the action to update or create the dictionary', function(){
            this.fakeActions.createOrUpdate.resolves('foo');

            this.dictionariesApi.update(reqRespMock.req, reqRespMock.res);

            expect(this.fakeActions.createOrUpdate).to.be.calledWith('test_scope','uuid', 'dictionary name');
        });
    });

    describe('get', function() {
        it('should return 404 when dictionary not found', function() {
            this.fakeActions.show.rejects('foo')().catch(function() {
                expect(reqRespMock.res.send).to.be.calledWith(404);
            });

            this.dictionariesApi.read(reqRespMock.req, reqRespMock.res);
        });

        it('should return 200 when dictionary found', function () {
            this.fakeActions.show.resolves('foo')().then(function() {
                expect(reqRespMock.res.send).to.be.calledWith(200);

            });
            this.dictionariesApi.read(reqRespMock.req, reqRespMock.res);



            //expect(true).to.be.false;

        });
    });
});