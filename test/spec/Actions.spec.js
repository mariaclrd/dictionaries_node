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

        this.findOne = function() {
            return self.dictionary;
        };

        this.fakeCollection = {
            findOne: self.findOne,
            update: sinon.spy(),
            create: sinon.spy()
        };

        this.findOneSpy = sinon.spy(this.fakeCollection, 'findOne');

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
                    assert(that.findOneSpy.called);
                };
                AsyncCheck.check(myCheck, dictionary, done)
            }, function(argument){
                done("failed test");
            });
        });


        describe('dictionary does not exists', function(){
            it( 'creates a new element', function(done){
                this.fakeCollection.findOne = function(){
                    return null;
                };
                var that = this;

                promise = this.actions.createOrUpdate('new_scope', that.uuid, 'new_name', 'content');

                promise.then(function(dictionary){
                    var myCheck = function(object) {
                        expect(that.fakeCollection.create).to.be.calledOnce;
                        expect(that.fakeCollection.create.args[0][0].scope).to.be.equals('new_scope');
                        expect(that.fakeCollection.create.args[0][0].name).to.be.equals('new_name');
                        expect(that.fakeCollection.create.args[0][0].content).to.be.equals('content');
                    };
                    AsyncCheck.check(myCheck, dictionary, done)
                }, function(argument){
                    done("failed test");
                });
            });
        });

        describe('dictionary already exists', function(){
            it( 'updates the element if it exists', function(done){
                var that = this;
                promise = this.actions.createOrUpdate('new_scope', that.uuid, 'new_name', 'content');
                promise.then(function(dictionary){
                    var myCheck = function(object) {
                        expect(that.fakeCollection.update).to.be.calledOnce;
                        expect(that.fakeCollection.update.args[0][1].name).to.be.equals('new_name');
                        expect(that.fakeCollection.update.args[0][1].content).to.be.equals('content');
                    };
                    AsyncCheck.check(myCheck, dictionary, done)
                }, function(argument){
                    done("failed test");
                });
            });
        });
    });

    describe('show', function() {
        it('should return a promise', function(done){
           var that = this;

           this.fakeCollection.findOne = function(){
             var obj = {
                exec: function() { return sinon.stub().resolves('foo')() }
             };
            return obj
           };
           this.findOneSpy = sinon.spy(this.fakeCollection, 'findOne');
           
           promise = this.actions.show('scope', 'uuid', 'name')

            promise.then(function(){
                try {
                    expect(that.findOneSpy).to.be.called;
                    done();
                } catch(error) {
                    done(error);
                }
            }, function() {
                done('Error: Reject called')
            });
        });
    });
});
