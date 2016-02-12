var Actions =  require('../../app/Actions');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var AsyncCheck = require('../helpers/AsyncCheck');
var Dictionary = require('../../app/models/Dictionaries');

var sinon = require('sinon');

describe('Actions', function() {
    beforeEach(function(){
        var self = this;

        this.user_uuid = "user_uuid";
        this.dictionary = {
            user_uuid: this.user_uuid
        };

        this.dictionaryFindOneStub = function() {
           return {
               exec : function(){
                   return new Promise(function(resolve, reject){
                       resolve(self.dictionary);
                   });
               }
           }
        };

        this.fakeCollection = {
            findOne: this.dictionaryFindOneStub,
            update: sinon.spy(),
            create: sinon.spy()
        };

        this.actions = new Actions(this.fakeCollection);
    });

    describe('createOrUpdate', function(){
        it('should return a promise', function(){
            expect(this.actions.createOrUpdate()).to.be.an.instanceof(Promise);
        });

        it('creates a dictionary if it doesn\'t exist', function(done) {
            var that = this;

            this.fakeCollection.findOne = function() {
                return {
                    exec : function(){
                        return new Promise(function(resolve, reject){
                            resolve(undefined);
                        });
                    }
                }
            };
            this.actions.createOrUpdate('new_scope', that.uuid, 'new_name', 'content').
            then(function () {
                expect(that.fakeCollection.create).to.be.calledOnce;
                expect(that.fakeCollection.create.args[0][0].scope).to.be.equals('new_scope');
                expect(that.fakeCollection.create.args[0][0].name).to.be.equals('new_name');
                expect(that.fakeCollection.create.args[0][0].content).to.be.equals('content');
            }).
                then(function() { done(); }).catch(function(err) { done(err); })
        });

        it('updates the dictionary if it exists', function(done){
           var that = this;
            this.actions.createOrUpdate('new_scope', that.uuid, 'new_name', 'content').
                then(function(){
                expect(that.fakeCollection.update).to.be.calledOnce;
                expect(that.fakeCollection.update.args[0][1].name).to.be.equals('new_name');
                expect(that.fakeCollection.update.args[0][1].content).to.be.equals('content');
            }).
            then(function() { done(); }).catch(function(err) { done(err); })
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
           this.dictionaryFindOneStub = sinon.spy(this.fakeCollection, 'findOne');
           
           promise = this.actions.show('scope', 'uuid', 'name')

            promise.then(function(){
                try {
                    expect(that.dictionaryFindOneStub).to.be.called;
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
