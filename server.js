const express = require('express');
var mongoose = require('mongoose');
const port = process.env.PORT || 8080;

var app = require('./backend/app');

app.use(express.static(__dirname + '/dist/'));
app.get(/.*/, function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
})

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DDBB, { useNewUrlParser: true })
    .then(() => {
        console.log("La conexion se ha realizado con exito");

        app.listen(process.env.PORT || port, () => {
            console.log("Servidor corriendo en localhost:" + port);
        });
    })
    .catch(err => {
        console.log(err);
    });

console.log("server started");