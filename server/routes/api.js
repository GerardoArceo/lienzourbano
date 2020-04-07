//REQUIREDS
require('../config/config');
const express = require('express');
const { executeAction } = require('../mysql/mysql');
const { verificaToken, CORS } = require('../middlewares/acceso');

const app = express();

app.use(CORS);

app.post('/API', verificaToken, async(req, res) => {
    let body = req.body;
    let accion = body.accion;
    let params = body.params;
    // info aportada por el JWT
    let data = { idUser: req.id, access: req.access };
    console.log(data);
    let result = await executeAction(accion, params, data);
    res.json(result);
});

module.exports = app;