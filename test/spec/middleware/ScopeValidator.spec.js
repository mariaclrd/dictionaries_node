var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var expect = chai.expect;
var scopeValidator = require('../../../app/middleware/ScopeValidator');
var buildReqRespMock = require('../../helpers/reqRespMock');

describe('ScopeValidator', function () {
    beforeEach(function() {
        this.reqRespMock = buildReqRespMock();
        this.reqRespMock.req.params = {
            scope: 'users',
            uuid: 'uuid',
            name: 'dictionary name'
        };

        this.send = this.reqRespMock.res.send;
        this.next = this.reqRespMock.next;
    });

    it('should accept scope = users', function() {
        this.scope = 'users';

        launchValidator.call(this);

        expect(this.send).to.not.have.been.called;
        expect(this.next).to.have.been.calledOnce;
    });

    it('should accept scope = accounts', function() {
        this.scope = 'users';

        launchValidator.call(this);

        expect(this.send).to.not.have.been.called;
        expect(this.next).to.have.been.calledOnce;
    });

    it('should should send 400 otherwise', function() {
        this.reqRespMock.req.params.scope = 'unsupportedScope';

        launchValidator.call(this);

        expect(this.send).to.have.been.calledWith(400);
    });

    var launchValidator = function() {
        scopeValidator(this.reqRespMock.req, this.reqRespMock.res, this.reqRespMock.next);
    }
});