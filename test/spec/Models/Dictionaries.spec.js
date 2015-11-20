var chai = require('chai');
var assert = chai.assert;
var Approval = require('../../../app/models/Dictionaries');

describe('Dictionaries model test', function() {

    it('should create a dictionary object', function () {
        var dictionary = new Approval({
            scope_type: 'fake-scope',
            uuid: 'fake-uuid',
            dict_name: 'fake-name'
        });
        assert.isOk(dictionary);
        assert.equal(dictionary.scope_type, 'fake-scope');
        assert.equal(dictionary.uuid, 'fake-uuid');
        assert.equal(dictionary.dict_name, 'fake-name');
    });

});