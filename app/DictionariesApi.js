var DictionariesApi =  function(actions) {
    this.actions = actions;

};

DictionariesApi.prototype.update=function(req,resp) {
    this.actions.createOrUpdate(req.params.scope, req.params.uuid, req.params.name)
        .then(function(value){
            resp.send(200);
        }, function(value){
            resp.send(500);
        });
};

module.exports = DictionariesApi;