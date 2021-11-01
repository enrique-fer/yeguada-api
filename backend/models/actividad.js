'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActividadSchema = Schema({
   title: String,
   content: Array,
   description: String,
   icon: String,
   image: String
});

module.exports = mongoose.model('Actividad', ActividadSchema);