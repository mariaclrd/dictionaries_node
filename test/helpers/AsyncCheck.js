var AsyncCheck = {};

AsyncCheck.check= function(checks, arg, done) {
    var err = null;
    try {
        checks(arg);
    } catch (error) {
        err = error;
    } finally {
        done(err);
    }

};

module.exports = AsyncCheck;