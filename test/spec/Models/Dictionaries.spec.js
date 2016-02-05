var chai = require('chai');
var assert = chai.assert;
var Approval = require('../../../app/models/Dictionaries');

describe('Dictionaries model test', function() {

    it('should create a dictionary object', function () {
        var dictionary = new Approval({
            scope: 'fake-scope',
            uuid: 'fake-uuid',
            name: 'fake-name',
            content: 'diccionario de chino'
        });
        assert.isOk(dictionary);
    });

    it('should create a populated dictionary object', function() {
        var dictionary = new Approval({
            scope: 'fake-scope',
            user_uuid: 'fake-uuid',
            name: 'fake-name',
            content: 'diccionario de chino'
        });
        assert.equal(dictionary.scope, 'fake-scope');
        assert.equal(dictionary.user_uuid, 'fake-uuid');
        assert.equal(dictionary.name, 'fake-name');
        assert.equal(dictionary.content, 'diccionario de chino');
    });

});