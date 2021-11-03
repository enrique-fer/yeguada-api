'use strict'

var validator = require('validator');
var cloudinary = require('cloudinary').v2;

var Cabecera = require('../models/cabecera');

var controller = {
    getCabeceras: (req, res) => {
        var query = Cabecera.find({});

        query.sort('_id').exec((err, cabeceras) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los cabeceras'
                })
            }

            if(!cabeceras) {
                return res.status(400).send({
                    status: 'error',
                    message: 'No hay cabeceras que mostrar'
                })
            }

            return res.status(200).send({
                status: 'succes',
                cabeceras
            })
        });
    },
    getCabecera: (req, res) => {
        var cabeceraId = req.params.id;

        if (!cabeceraId || cabeceraId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe la cabecera'
            })
        }

        Cabecera.findById(cabeceraId, (err, cabecera) => {
            if (err || !cabecera) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe la cabecera'
                })
            }

            return res.status(200).send({
                status: 'succes',
                cabecera
            })
        })
    },
    save: (req, res) => {
        var params = req.body;

        try {
            var validate_mainPage = params.isMainPage != null ? params.isMainPage : null;
            var validate_title = !validator.isEmpty(params.title);
            var validate_path = !validator.isEmpty(params.path);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_mainPage != null && validate_title && validate_path) {
            var cabecera = new Cabecera();

            cabecera.isMainPage = params.isMainPage;
            cabecera.title = params.title;
            cabecera.path = params.path;
            cabecera.bg_image = null;

            cabecera.save((err, cabStored) => {
                if (err || !cabStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'La cabecera no se ha guardado'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    cabecera: cabStored
                });
            })
        } else {
            return res.status(500).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }
    },
    upload: (req, res) => {
        var file_name = 'Imagen no subida...';

        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }

        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        var file_name = file_split[2];

        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'La extension de la imagen no es valida'
                });
            });
        } else {
            var photo = {};
            cloudinary.config({
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.API_KEY,
                api_secret: process.env.API_SECRET
            });

            cloudinary.uploader
            .upload(
                file_path,
                {public_id: extension_split[0]},
                (error, result) => {
                    photo = result;

                    var cabeceraId = req.params.id;

                    Cabecera.findOneAndUpdate(
                        { _id: cabeceraId },
                        { bg_image: file_name },
                        { new: true },
                        (err, cabeceraUpdated) => {
                            if (err || !cabeceraUpdated) {
                                return res.status(200).send({
                                    status: 'error',
                                    message: 'Error al guardar la imagen del cabecera'
                                });
                            }

                            return res.status(200).send({
                                status: 'success',
                                cabecera: cabeceraUpdated
                            });
                        }
                    );
                }
            );
        }
    },
    delete: (req, res) => {
        var cabeceraId = req.params.id;

        Cabecera.findOneAndDelete(
            { _id: cabeceraId },
            (err, cabRemoved) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: "Error al borrar"
                    });
                }

                if (!cabRemoved) {
                    return res.status(404).send({
                        status: 'error',
                        message: "No se ha borrado, posiblemente no exista"
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    cabecera: cabRemoved
                });
            }
        )
    }
};

module.exports = controller;