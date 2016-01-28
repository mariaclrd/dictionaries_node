'use strict'

class Actions {

    constructor(dictionaries_collection) {
        this.collection = dictionaries_collection;
    }

    createOrUpdate(scope, uuid, name){
        var self = this;
        var promise = new Promise(function(resolve, reject){
            var dictionary = self.collection.findOne({scope: scope, uuid: uuid}, reject);
            resolve(dictionary);
        });
        return promise;
    }

    show(){
        var self = this;

        var promise = new Promise(function(resolve, reject){
            var dictionary = self.collection.find();
            resolve(dictionary);
        });
        return promise;
    }
}

module.exports = Actions;