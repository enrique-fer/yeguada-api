'use strict'

var express = require('express');
var app = express();

var caballos_routes = require('./routes/caballos');
var cabeceras_routes = require('./routes/cabeceras');
var actividades_routes = require('./routes/actividades');
var auth_routes = require('./routes/auth');
var multipart = require('connect-multiparty');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(multipart());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})

app.use('/api/caballo', caballos_routes);
app.use('/api/cabecera', cabeceras_routes);
app.use('/api/actividad', actividades_routes);
app.use('/api/auth', auth_routes);

module.exports = app;