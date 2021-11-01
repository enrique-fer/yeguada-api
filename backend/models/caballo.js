'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CaballoSchema = Schema({
    title: String,
    info: {
        raza: String,
        edad: Number,
        color: String,
        padre: String,
        madre: String
    },
    image: String
});

module.exports = mongoose.model('Caballo', CaballoSchema);