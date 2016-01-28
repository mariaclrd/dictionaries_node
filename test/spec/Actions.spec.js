var Actions =  require('../../app/Actions');
var chai = require('chai');
var expect = chai.expect;
var AsyncCheck = require('../helpers/AsyncCheck');
var sinon = require('sinon');

describe('Actions', function() {
    beforeEach(function(){
        var self = this
        this.uuid = "dictionary_uuid";
        this.dictionary = {
            uuid: this.uuid
        };

        this.fakeCollection = {
            findOne: function (params, err_callback) {
                return self.dictionary
            }
        };

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
                        expect(object.uuid).to.be.equal(self.uuid)
                    };
                    AsyncCheck.check(myCheck, dictionary, done)
                }, done);

            });
        });

    })
})