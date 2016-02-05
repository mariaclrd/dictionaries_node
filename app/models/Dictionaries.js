var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DictionarySchema = new Schema({
    scope: {
        type: String,
        unique: false,
        required: true,
        index: true
    },
    user_uuid: {
        type: String,
        unique: false,
        required: true,
        index: true
    },
    account_uuid: {
        type: String,
        unique: false,
        required: true,
        index: true
    },
    name: {
        type: String,
        unique: false,
        required: true
    },
    content: {
        type: String,
        unique: false,
        required: true
    }
});

var Dictionary = mongoose.model('Dictionary', DictionarySchema);

module.exports = Dictionary;