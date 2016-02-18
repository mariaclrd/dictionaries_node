'use strict';

class DictionariesApi {

    constructor(actions) {
        this.actions = actions;

    }

    update(req,resp) {
        var promise = this.actions.createOrUpdate(req.params.scope, req.params.uuid, req.params.name, req.params.content);
        promise.then(function(dictionary){
            resp.sendStatus(200);
            resp.json(dictionary);
        }, function() {
            resp.send(500);
        });
    }

    read(req, resp) {
        var promise = this.actions.show(req.params.scope, req.params.uuid, req.params.name)
        promise.then(function() {
            resp.send(201);
        },
        function() {
            resp.send(404);
        });
    }

}

module.exports = DictionariesApi;