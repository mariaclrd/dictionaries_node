var AsyncCheck = {};

AsyncCheck.check= function(checks, arg, done) {
    try {
        checks(arg);
    } catch (error) {
        done(error);
    } finally {
        done();
    }

};

module.exports = AsyncCheck;