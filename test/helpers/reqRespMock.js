var sinon = require('sinon');

var reqRespMock = {};

reqRespMock.req = {
    query: sinon.stub()
};

reqRespMock.res = {
    send: function(param) {
        var spy = sinon.spy();
        spy(param);
        return spy;
    },
    json: function() {
        return sinon.spy()
    },
    status: function() {
        sinon.spy()
    }
};

module.exports = reqRespMock;