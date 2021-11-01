'use strict'

var express = require('express');
var ActividadController = require('../controllers/actividad');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './upload/actividades'});

//Rutas
router.get('/', ActividadController.getActividades);
router.get('/:id', ActividadController.getActividad);
router.post('/save', ActividadController.save);
router.post('/upload-image/:id', md_upload, ActividadController.upload);
router.get('/get-image/:image', ActividadController.getImage);
router.put('/update/:id', ActividadController.update);
router.delete('/delete/:id', ActividadController.delete);

module.exports = router;