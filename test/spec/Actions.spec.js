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

        this.fakeCollection = {
            find: self.findStub,
            findOne: sinon.spy()
        };

        this.findSpy = sinon.spy(this.fakeCollection, 'find');

        this.actions = new Actions(this.fakeCollection);


    });

    describe('createOrUpdate', function(){
        it('should return a promise', function(){
            expect(this.actions.createOrUpdate()).to.be.an.instanceof(Promise);
        });

        describe('dictionary does not exist yet', function(){
            it ('should create a dictionary if it does not exist', function(done){
                var self = this;
                promise = this.actions.createOrUpdate();
                promise.then(function(dictionary){
                    var myCheck = function(object) {
                        assert(self.fakeCollection.findOne.called)
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
