var DictionariesApi = require('../../app/DictionariesApi');
var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var expect = chai.expect;
var reqRespMock = require('../helpers/reqRespMock');


describe('DictionariesApi', function() {
    beforeEach(function() {
        this.dictionariesApi = new DictionariesApi();
    });

    it('should exists', function() {
        expect(this.dictionariesApi).to.not.be.undefined;
    });

    describe('put', function() {
        it('should return 200', function() {

            this.dictionariesApi.update(reqRespMock.req, reqRespMock.res);

            expect(reqRespMock.res.send).to.be.calledWith(200);
            expect(reqRespMock.res.send).to.be.calledOnce;
        });
    });
});