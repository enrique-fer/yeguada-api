'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');
const auth = require('../middleware/auth');

var router = express.Router();

//Rutas
router.get('/', auth, UsuarioController.checkAuth);
router.post('/signin', UsuarioController.signIn);
router.post('/signup', UsuarioController.signUp);


module.exports = router;