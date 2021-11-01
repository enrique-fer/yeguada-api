'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CabeceraSchema = Schema({
    isMainPage: Boolean,
    title: String,
    path: String,
    bg_image: String
});

module.exports = mongoose.model('Cabecera', CabeceraSchema);