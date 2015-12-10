"use strict";

class DictionariesApi {

    constructor(actions) {
        this.actions = actions;
    }

    update(req,resp) {
        var promise = this.actions.createOrUpdate(req.params.scope, req.params.uuid, req.params.name);
        promise.then(function(){
            resp.send(200);
        }, function() {
            resp.send(500);
        });
    }

    read(req, resp) {
        this.actions.show()
            .then(function() {
                resp.send(201);
            },
            function() {
                resp.send(404);
            });
    }

}

module.exports = DictionariesApi;