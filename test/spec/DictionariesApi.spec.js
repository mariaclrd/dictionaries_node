var DictionariesApi = require('../../app/DictionariesApi');
var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var expect = chai.expect;
var reqRespMock = require('../helpers/reqRespMock');
require('sinon-as-promised');


describe('DictionariesApi', function() {

    beforeEach(function() {
        this.fakeActions = {};
        this.fakeActions.createOrUpdate = sinon.stub();

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
        it('should return 200', function() {
            this.fakeActions.createOrUpdate.resolves('foo')().then(function() {
                expect(reqRespMock.res.send).to.be.calledWith(200);
                expect(reqRespMock.res.send).to.be.calledOnce;
                done();
            });

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
});