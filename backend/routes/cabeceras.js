'use strict'

var express = require('express');
var CabeceraController = require('../controllers/cabecera');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './upload/cabeceras'});

router.get('/', CabeceraController.getCabeceras);
router.get('/:id', CabeceraController.getCabecera);
router.post('/save', CabeceraController.save);
router.post('/upload-image/:id', md_upload, CabeceraController.upload);
router.delete('/delete/:id', CabeceraController.delete);

module.exports = router;