var chai = require('chai');
var mongoose = require('mongoose');
//var finallyDone = require('../helpers/finallyDone');
var assert = chai.assert;
var Dictionary = require('../../../app/models/Dictionaries');

describe('Dictionaries model test', function() {

    before( function() {
            mongoose.connect("mongodb://localhost/dictionaries");
            mongoose.Promise = Promise;
    });

    it('should create a dictionary object', function () {
        var dictionary = new Dictionary({
            scope: 'fake-scope',
            uuid: 'fake-uuid',
            name: 'fake-name',
            content: 'diccionario de chino'
        });
        assert.isOk(dictionary);
    });

    it('should create a populated dictionary object', function() {
        var dictionary = new Dictionary({
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

    it('writes the information on the database', function(done){
        var dictionary = {
            scope: 'fake-scope',
            user_uuid: 'fake-uuid',
            account_uuid: 'account_uuid',
            name: 'fake-name',
            content: 'diccionario de chino'
        };

        Dictionary.create(dictionary).
            then(function() { return Dictionary.findOne({user_uuid: 'fake-uuid'}) }).
            then(function(dictionary) { console.log(dictionary);  }).
            then(done).catch(done);

    });

    it('another one', function (done) {
        var dictionary = {
            scope: 'fake-scope',
            user_uuid: 'fake-uuid',
            account_uuid: 'account_uuid',
            name: 'fake-name',
            content: 'diccionario de chino'
        };

        var willCreate = Dictionary.create(dictionary);
        willCreate.then(function() {
            var willFind =  Dictionary.findOne({user_uuid: 'fake-uuid'}).exec();
            willFind.then(function(dictionary) {
                console.log(dictionary);
            }).then(function() {
                console.log('al loro!');
                done();
            }).catch(done);
        })

    });
});