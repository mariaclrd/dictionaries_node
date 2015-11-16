var Provider = require('../../app/Provider');
var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var expect = chai.expect;

describe('Provider', function () {
    beforeEach(function() {
        this.provider = new Provider();
    });

	describe('config', function () {
		beforeEach(function() {
			this.config = this.provider.config();
		});

		it('has http', function () {
			expect(this.config.http().port).not.to.be.undefined;
		});
	});

	describe('dictionaries', function () {
		beforeEach(function() {
			this.dictionaries = this.provider.dictionaries();
		});

		it('has an API', function () {
			expect(this.dictionaries.api()).not.to.be.undefined;
		});
	});
});
