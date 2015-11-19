var DictionariesApi =  function(actions) {
    this.actions = actions;

};

DictionariesApi.prototype.update=function(req,resp) {
    this.actions.createOrUpdate(req.params.scope, req.params.uuid, req.params.name)
        .then(function(){
            resp.send(200);
        })
        .catch(function(){
            resp.send(500);
        });
};

module.exports = DictionariesApi;