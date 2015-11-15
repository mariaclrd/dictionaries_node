var Provider = require('../../../app/Provider');
var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var expect = chai.expect;
var mockFs = require('mock-fs');

describe('Provider', function () {
	describe('config', function () {
		beforeEach(function() {
			this.provider = new Provider();
		});

		describe('without config/http.json', function () {
			beforeEach(function() {
				mockFs({
					'config/http-defaults.json': JSON.stringify({port:3001})
				});
			});

			afterEach(function() {
				mockFs.restore();
			});

			it('exposes default values', function () {
				expect(this.provider.config().http.port).to.equal(3001);
			});
		});

		describe('with config/http.json', function () {
			beforeEach(function() {
				mockFs({
					'config/http-defaults.json': JSON.stringify({port:3001}),
					'config/http.json': JSON.stringify({port:3002,https:false})
				});
			});

			afterEach(function() {
				mockFs.restore();
			});

			it('exposes http.json', function () {
				expect(this.provider.config().http.port).to.equal(3002);
			});

			it('keeps non overriden values', function () {
				expect(this.provider.config().http.https).to.equal(false);
			});
		});
	});
});
