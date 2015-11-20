var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DictionarySchema = new Schema({
    scope_type: {
        type: String,
        unique: false,
        required: true,
        index: true
    },
    uuid: {
        type: String,
        unique: false,
        required: true,
        index: true
    },
    dict_name: {
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