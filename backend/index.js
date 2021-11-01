'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var config = require('./config');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DDBB, { useNewUrlParser: true })
    .then(() => {
        console.log("La conexion se ha realizado con exito");

        app.listen(process.env.PORT || config.port, () => {
            console.log("Servidor corriendo en localhost:" +  config.port);
        });
    })
    .catch(err => {
        console.log(err);
    });