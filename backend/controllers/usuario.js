'use strict'

var validator = require('validator');
var service = require('../services');

var Usuario = require('../models/usuario');

var controller = {
    signUp: (req, res) => {
        var params = req.body;

        try {
            var validate_nombre = !validator.isEmpty(params.nombre);
            var validate_apellidos = !validator.isEmpty(params.apellidos);
            var validate_email = !validator.isEmpty(params.email);
            var validate_password = !validator.isEmpty(params.password);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_nombre && validate_apellidos && validate_email && validate_password) {
            var usuario = new Usuario();

            usuario.nombre = params.nombre;
            usuario.apellidos = params.apellidos;
            usuario.email = params.email;
            usuario.password = params.password;

            usuario.save((err, usStored) => {
                if (err || !usStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: `El usuario no se ha guardado ${err}`,
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    token: service.createToken(usStored),
                    logged_in: "LOGGED_IN"
                });
            })
        } else {
            return res.status(500).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }
    },
    signIn: (req, res) => {
        Usuario.find({ email: req.body.email }, (err, user) => {
            if (err) {
                return res.status(500).send({
                    status: "error",
                    message: err
                })
            }

            if (!user) {
                return res.status(404).send({
                    status: "error",
                    message: "No existe el usuario"
                })
            }

            req.user = user;
            res.status(200).send({
                status: "success",
                token: service.createToken(user),
                logged_in: "LOGGED_IN"
            })
        })
    },
    checkAuth: (req, res) => {
        res.status(200).send({
            logged_in: 'LOGGED_IN'
        })
    }
};

module.exports = controller;