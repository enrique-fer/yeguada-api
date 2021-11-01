'use strict'

const services = require('../services');

function isAuth (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({
            logged_in: "NOT_LOGGED_IN"
        })
    }

    const token = req.headers.authorization.split(' ')[1];
    
    services.decodeToken(token)
        .then(response => {
            req.user = response;
            next();
        })
        .catch(err => {
            res.status(err.status);
        })
}

module.exports = isAuth;