'use strict';

var scopeValidate = function(req, resp, next) {
    if(req.params.scope !== 'users' && req.params.scope !== 'accounts') {
        resp.send(400);
    }

    next();
};

module.exports = scopeValidate;