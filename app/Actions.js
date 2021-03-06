'use strict';

class Actions {

    constructor(dictionariesCollection) {
        this.collection = dictionariesCollection;
    }

    createOrUpdate(scope, uuid, name, content) {
        var self = this;
        return new Promise((resolve, reject) => {
            self.collection.findOne({scope: scope, uuid: uuid}).exec().then((dictionary) => {
                if (dictionary) {
                    self.collection.update({uuid: uuid}, {name: name, content: content}).
                    then((value) => {
                        resolve(dictionary);
                    }, (error) => {
                        reject(error);
                    });
                } else {
                    self.collection.create({scope: scope, name: name, content: content, user_uuid: uuid}).
                    then((dictionary) => {
                        resolve(dictionary);
                    }, (error) => {
                        reject(error);
                    });
                }
            }, (error) => {
                reject(error);
            });
        });
    }

    show(scope, uuid, name) {
        var self = this;

        var dictionary = self.collection.findOne({scope: scope, uuid: uuid, name: name});
        return dictionary.exec();
    }
}

module.exports = Actions;