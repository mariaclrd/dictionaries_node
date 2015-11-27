

var DictionariesApi =  function(actions) {
    this.actions = actions;

};

DictionariesApi.prototype.update = function(req,resp) {
    var promise = this.actions.createOrUpdate(req.params.scope, req.params.uuid, req.params.name);
    promise.then(function(){
        resp.send(200);
    }, function() {
        resp.send(500);
    });
};

DictionariesApi.prototype.read = function(req, resp) {
    this.actions.show()
        .then(function() {
            resp.send(201);
        },
        function(error) {
            throw error;
        });
};

module.exports = DictionariesApi;