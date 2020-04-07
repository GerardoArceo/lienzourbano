//REQUIREDS
const express = require('express');
const jwt = require('jsonwebtoken');
const { executeAction } = require('../mysql/mysql');
const { verificaToken, CORS } = require('../middlewares/acceso');

const app = express();

app.use(CORS);

// CAPTCHA pendiente
app.post('/login', [verificaToken], async(req, res) => {
    let alerta = {
        ok: false,
        type: 'error',
        title: 'ERROR',
        text: 'Usuario y/o contraseña incorrectos'
    };
    let body = req.body;
    let token = 'Error';
    let email = body.email;
    let pass = body.pass;
    let result = await executeAction('login', { email, pass }, {});
    let datos = result[1][0][0];
    if (datos != undefined) {
        token = jwt.sign({
            id: datos.id,
            name: datos.name,
            access: datos.access
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
        alerta = {
            ok: true,
            type: 'success',
            title: 'ÉXITO',
            text: 'Sesión iniciada correctamente'
        };
        datos.token = token;
    } else {
        datos = {};
    }
    res.json([alerta, datos]);
});

module.exports = app;