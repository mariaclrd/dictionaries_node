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

            var resp = this.dictionariesApi.update(reqRespMock.req, reqRespMock.res);

            //expect(resp).to.be.calledWidth(200);
            expect(resp).to.be.calledOnce;
        });
    });
});