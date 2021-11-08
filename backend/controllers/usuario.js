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
            var validate_telefono = !validator.isEmpty(params.telefono);
            var validate_password = !validator.isEmpty(params.password);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_nombre && validate_apellidos && validate_email 
            && validate_telefono && validate_password) {
            var usuario = new Usuario();

            usuario.nombre = params.nombre;
            usuario.apellidos = params.apellidos;
            usuario.email = params.email;
            usuario.telefono = params.telefono;
            usuario.password = params.password;
            usuario.token = service.createToken(usuario);

            usuario.save((err, usStored) => {
                if (err || !usStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: `El usuario no se ha guardado`,
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    token: usStored.token,
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
        let usuario = req.body.user;

        Usuario.find({ email: usuario.email, password: usuario.password }, (err, user) => {
            if (err) {
                return res.status(500).send({
                    status: "error",
                    message: err,
                    logged_in: 'NOT_LOGGED_IN'
                })
            }

            if (user.length == 0) {
                return res.status(404).send({
                    status: "error",
                    message: "No existe el usuario",
                    logged_in: 'NOT_LOGGED_IN'
                })
            }

            let usuario = user[0];
            let token = service.createToken(usuario);

            Usuario.findByIdAndUpdate(
                { _id : usuario._id },
                { token: token },
                { new: true },
                (error, us) => {
                    if (error) {
                        return res.status(500).send({
                            status: 'error',
                            message: 'Error al actualizar'
                        });
                    }

                    req.user = usuario;
                    return res.status(200).send({
                        status: "success",
                        token: token,
                        logged_in: "LOGGED_IN"
                    });
                }
            )
        })
    },
    checkAuth: (req, res) => {
        res.status(200).send({
            logged_in: 'LOGGED_IN'
        })
    },
    getUser: (req, res) => {
        let token = req.headers.authorization.split(' ')[1];

        Usuario.find({ token: token }, (err, user) => {
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
                user: user
            })
        })
    }
};

module.exports = controller;