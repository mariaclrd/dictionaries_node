var sinon = require('sinon');

var buildReqRespMock = function () {
	var reqRespMock = {};

	reqRespMock.req = {
		query: sinon.stub(),
		params: {}
	};

	reqRespMock.res = {
		send: sinon.spy(),
		json: function() {
			return sinon.spy()
		},
		status: function() {
			sinon.spy()
		}
	};

	reqRespMock.next = sinon.spy();

	return reqRespMock
}

module.exports = buildReqRespMock;
