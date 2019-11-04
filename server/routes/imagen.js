//REQUIREDS
const express = require('express');
const { executeAction } = require('../mysql/mysql');
const { verificaToken, CORS } = require('../middlewares/acceso');

const app = express();

app.use(CORS);

app.get('/imagen', verificaToken, async(req, res) => {
    let accion = req.query.accion;
    let id = req.query.id;

    let idPersona = req.idPersona;
    let idTipo = req.idTipo;
    let data = { idPersona, idTipo };

    try {

        let result = await executeAction(accion, { id }, data);
        result = result[1][0];
        if (accion == 'verImagen')
            result = result[0];
        let blob = Object.values(result)[0];
        if (accion == 'verFoto')
            blob = blob.Foto;

        if (blob !== null) {
            var buffer = new Buffer.from(blob);
            let str = buffer.toString();
            if (str.startsWith('data:image/')) { //Si ya viene en base64
                str = str.split('base64,')[1];
                res.json({ imagen: str });
            } else { //Si viene en blob feo
                var bufferBase64 = buffer.toString('base64');
                res.json({ imagen: bufferBase64 });
            }
        } else {
            res.json({ imagen: null });
        }
    } catch (Exception) {
        console.log("ERROR" + Exception);
        res.json({ imagen: null });
    }

});

module.exports = app;