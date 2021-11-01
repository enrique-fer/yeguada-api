'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UsuarioSchema = Schema({
    nombre: String,
    apellidos: String,
    email: { type: String, unique: true, lowercase: true },
    contraseña: { type: String, select: false },
    signUpDate: { type: Date, default: Date.now() },
    lastLogin: Date
});

UsuarioSchema.pre('save', function (next) {
    let user = this;

    if (!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next()
        }

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        })
    })
})

module.exports = mongoose.model('Usuario', UsuarioSchema);