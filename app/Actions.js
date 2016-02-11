'use strict'

class Actions {

    constructor(dictionaries_collection) {
        this.collection = dictionaries_collection;
    }

    createOrUpdate(scope, uuid, name, content){
        var self = this;
        var promise = new Promise(function(resolve, reject) {
            var dictionaryPromise = self.collection.findOne({scope: scope, uuid: uuid}).exec();

            dictionaryPromise.then( function(dictionary){
                    if(dictionary) {
                        self.collection.update({uuid: uuid}, { name: name, content: content }, reject);
                    }
                    else {
                        self.collection.create({scope: scope, name: name, content: content, user_uuid: uuid}, reject);
                    }
                }
            );
            resolve();
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