'use strict'

var validator = require('validator');
var cloudinary = require('cloudinary').v2;

var Caballo = require('../models/caballo');

var controller = {
    getCaballos: (req, res) => {
        var query = Caballo.find({});

        query.sort('-_id').exec((err, caballos) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los caballos'
                })
            }

            if(!caballos) {
                return res.status(400).send({
                    status: 'error',
                    message: 'No hay caballos que mostrar'
                })
            }

            return res.status(200).send({
                status: 'succes',
                caballos
            })
        });
    },
    getCaballo: (req, res) => {
        var caballoId = req.params.id;

        if (!caballoId || caballoId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el caballo'
            })
        }

        Caballo.findById(caballoId, (err, caballo) => {
            if (err || !caballo) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el caballo'
                })
            }

            return res.status(200).send({
                status: 'succes',
                caballo
            })
        })
    },
    save: (req, res) => {
        var params = req.body;

        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_info = validator.isJSON(JSON.stringify(params.info));
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            })
        }

        if (validate_title && validate_info) {
            var caballo = new Caballo();

            caballo.title = params.title;
            caballo.info = params.info;
            caballo.image = null;

            caballo.save((err, cabStored) => {
                if (err || !cabStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El caballo no se ha guardado'
                    })
                }

                return res.status(200).send({
                    status: 'succes',
                    caballo: cabStored
                })
            });
        } else {
            return res.status(500).send({
                status: 'error',
                message: 'Los datos no son validos'
            })
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



        var file_name = file_split.pop();

        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            return res.status(200).send({
                status: 'error',
                message: 'La extension de la imagen no es valida'
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

                    var caballoId = req.params.id;

                    Caballo.findOneAndUpdate(
                        { _id: caballoId },
                        { image: photo.public_id },
                        { new: true },
                        (err, caballoUpdated) => {
                            if (err || !caballoUpdated) {
                                return res.status(200).send({
                                    status: 'error',
                                    message: 'Error al guardar la imagen del caballo'
                                });
                            }
        
                            return res.status(200).send({
                                status: 'success',
                                caballo: caballoUpdated
                            });
                        }
                    );
                },
            );
        }
    },
    update: (req, res) => {
        var caballoId = req.params.id;

        var params = req.body;
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_info = validator.isJSON(JSON.stringify(params.info));
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            })
        }

        if (validate_title && validate_info) {
            Caballo.findOneAndUpdate(
                { _id: caballoId },
                params,
                { new: true },
                (err, caballoUpdated) => {
                    if (err) {
                        return res.status(500).send({
                            status: 'error',
                            message: 'Error al actualizar'
                        });
                    }

                    if (!caballoUpdated) {
                        return res.status(404).send({
                            status: 'error',
                            message: 'No existe el caballo'
                        });
                    }

                    return res.status(200).send({
                        status: 'success',
                        caballo: caballoUpdated
                    });
                }
            )
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'La validacion no es correcta'
            });
        }
    },
    delete: (req, res) => {
        var caballoId = req.params.id;

        Caballo.findOneAndDelete(
            { _id: caballoId },
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
                    caballo: cabRemoved
                });
            }
        )
    }
}

module.exports = controller;