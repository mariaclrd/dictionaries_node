var finallyDone = function (done, block) {
	try {
		block();
		done();
	} catch (err) {
		done(err);
	}
}

module.exports = finallyDone;
