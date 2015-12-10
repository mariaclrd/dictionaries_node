var Actions =  require('../../app/Actions');
var chai = require('chai');
var expect = chai.expect;

describe('Actions', function() {
    beforeEach(function(){
        this.actions = new Actions();

    })
    describe('createOrUpdate', function(){
        it('should return a promise', function(){
            expect(this.actions.createOrUpdate()).to.be.an.instanceof(Promise);
        })
    })
})