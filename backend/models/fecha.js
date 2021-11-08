'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Reserva = Schema({
   activity_id: String,
   date: Date,
   start: String,
   end: String,
   user_id: String
});

module.exports = mongoose.model('Reserva', ActividadSchema);