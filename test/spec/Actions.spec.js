var Actions =  require('../../app/Actions');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var AsyncCheck = require('../helpers/AsyncCheck');
var sinon = require('sinon');

describe('Actions', function() {
    beforeEach(function(){
        var self = this;
        this.uuid = "dictionary_uuid";
        this.dictionary = {
            uuid: this.uuid
        };

        this.findStub = function() {
            return self.dictionary;
        };

        this.findOneStub = function() {
            return self.dictionary
        };

        this.fakeCollection = {
            find: self.findStub,
            findOne: self.findOneStub,
            update: sinon.spy()
        };

        this.findSpy = sinon.spy(this.fakeCollection, 'find');
        this.findOneSpy = sinon.spy(this.fakeCollection, 'findOne')

        this.actions = new Actions(this.fakeCollection);


    });

    describe('createOrUpdate', function(){
        it('should return a promise', function(){
            expect(this.actions.createOrUpdate()).to.be.an.instanceof(Promise);
        });

        it ('uses the collection to check if the dictionary exists', function(done){
            var that = this;
            promise = this.actions.createOrUpdate();
            promise.then(function(dictionary){
                var myCheck = function(object) {
                    assert(that.findOneSpy.called)
                };
                AsyncCheck.check(myCheck, dictionary, done)
            }, function(argument){
                done("failed test")
            });
        });

        describe('dictionary already exists', function(){
            it( 'updates the element if it exists', function(done){
                var that = this;
                promise = this.actions.createOrUpdate('new_scope', that.uuid, 'new_name');
                promise.then(function(dictionary){
                    var myCheck = function(object) {
                        assert(that.fakeCollection.update.called)
                    };
                    AsyncCheck.check(myCheck, dictionary, done)
                }, function(argument){
                    done("failed test")
                });
            });
        });
    });

    describe('show', function() {
        it('should return a promise', function(){
           expect(this.actions.show()).to.be.an.instanceof(Promise);
        });

        it('should return a dictionary', function(done){
            var that = this;
            promise = this.actions.show();
            promise.then(function(){
                try {
                    expect(that.findSpy).to.be.called;
                    done();
                } catch(error) {
                    done(error)
                }
            });
        });
    });
});
