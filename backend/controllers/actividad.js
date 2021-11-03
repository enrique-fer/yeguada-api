'use strict'

var validator = require('validator');
var cloudinary = require('cloudinary').v2;

var Actividad = require('../models/actividad');

var controller = {
    getActividades: (req, res) => {
        var query = Actividad.find({});

        query.sort('_id').exec((err, actividades) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los actividades'
                })
            }

            if(!actividades) {
                return res.status(400).send({
                    status: 'error',
                    message: 'No hay actividades que mostrar'
                })
            }

            return res.status(200).send({
                status: 'succes',
                actividades
            })
        });
    },
    getActividad: (req, res) => {
        var actividadId = req.params.id;

        if (!actividadId || actividadId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe la actividad'
            })
        }

        Actividad.findById(actividadId, (err, actividad) => {
            if (err || !actividad) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe la actividad'
                })
            }

            return res.status(200).send({
                status: 'succes',
                actividad
            })
        })
    },
    save: (req, res) => {
        var params = req.body;

        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content.toString());
            var validate_description = !validator.isEmpty(params.description);
            var validate_icon = !validator.isEmpty(params.icon);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_title && validate_content && validate_description && validate_icon) {
            var actividad = new Actividad();

            actividad.title = params.title;
            actividad.content = params.content;
            actividad.description = params.description;
            actividad.icon = params.icon;
            actividad.image = null;

            actividad.save((err, actStored) => {
                if (err || !actStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'La actividad no se ha guardado'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    actividad: actStored
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

                    var actividadId = req.params.id;

                    Actividad.findOneAndUpdate(
                        { _id: actividadId },
                        { image: file_name },
                        { new: true },
                        (err, actUpdated) => {
                            if (err || !actUpdated) {
                                return res.status(200).send({
                                    status: 'error',
                                    message: 'Error al guardar la imagen de la actividad'
                                });
                            }

                            return res.status(200).send({
                                status: 'success',
                                actividad: actUpdated
                            });
                        }
                    );
                }
            );
        }
    },
    update: (req, res) => {
        var actividadId = req.params.id;

        var params = req.body;
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
            var validate_description = !validator.isEmpty(params.description);
            var validate_icon = !validator.isEmpty(params.icon);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            })
        }

        if (validate_title && validate_content && validate_description && validate_icon) {
            Actividad.findOneAndUpdate(
                { _id: actividadId },
                params,
                { new: true },
                (err, actUpdated) => {
                    if (err) {
                        return res.status(500).send({
                            status: 'error',
                            message: 'Error al actualizar'
                        });
                    }

                    if (!actUpdated) {
                        return res.status(404).send({
                            status: 'error',
                            message: 'No existe la actividad'
                        });
                    }

                    return res.status(200).send({
                        status: 'success',
                        actividad: actUpdated
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
        var actividadId = req.params.id;

        Actividad.findOneAndDelete(
            { _id: actividadId },
            (err, actRemoved) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: "Error al borrar"
                    });
                }

                if (!actRemoved) {
                    return res.status(404).send({
                        status: 'error',
                        message: "No se ha borrado, posiblemente no exista"
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    actividad: actRemoved
                });
            }
        )
    }
};

module.exports = controller;