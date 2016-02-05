'use strict'

class Actions {

    constructor(dictionaries_collection) {
        this.collection = dictionaries_collection;
    }

    createOrUpdate(scope, uuid, name){
        var self = this;
        var promise = new Promise(function(resolve, reject){
            var dictionary = self.collection.findOne({scope: scope, uuid: uuid}, reject);
            if(dictionary) {
                self.collection.update({uuid: uuid}, {scope: scope, name: name}, reject);
            }
            else {
                self.collection.create({scope: scope, name: name}, reject);
            }

            resolve(dictionary);
        });
        return promise;
    }

    show(scope, uuid, name){
        var self = this;

        var dictionary = self.collection.findOne({scope: scope, uuid: uuid, name: name});
        var promise = dictionary.exec();
        return promise;
    }
}

module.exports = Actions;