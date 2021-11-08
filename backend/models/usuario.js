'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    nombre: String,
    apellidos: String,
    email: { type: String, unique: true, lowercase: true },
    telefono: String,
    contraseña: { type: String, select: false },
    signUpDate: { type: Date, default: Date.now() },
    lastLogin: Date,
    token: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);