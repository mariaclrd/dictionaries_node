'use strict'

class Actions {

    constructor(dictionaries_collection) {
        this.collection = dictionaries_collection;
    }

    createOrUpdate(scope, uuid, name){
        var self = this;
        var promise = new Promise(function(resolve, reject){
            var dictionary = self.collection.findOne({scope: scope, uuid: uuid}, reject(dictionary));
            resolve(dictionary);
        });
        return promise;
    }
}

module.exports = Actions;