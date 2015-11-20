var AsyncCheck = {};

AsyncCheck.check= function(checks, arg, done) {
    try {
        checks(arg);
        done();
    } catch (error) {
        done(error);
    }
};

module.exports = AsyncCheck;