'use strict'

class Actions {

    constructor(dictionaries_collection) {
        this.collection = dictionaries_collection;
    }

    createOrUpdate(scope, uuid, name, content){
        var self = this;
        var promise = new Promise(function(resolve, reject){
            var dictionary = self.collection.findOne({scope: scope, uuid: uuid}, reject);
            if(dictionary) {
                self.collection.update({uuid: uuid}, { name: name, content: content }, reject);
            }
            else {
                self.collection.create({scope: scope, name: name, content: content}, reject);
            }

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