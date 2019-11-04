//REQUIREDS
require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(require('./routes/index')); // Configuración global de rutas

if (process.env.NODE_ENV === 'dev') {
    process.env.HOST_DB = '127.0.0.1';
    app.listen(port);
} else {
    https.createServer({
        key: fs.readFileSync('/etc/ssl/private/private.key'),
        cert: fs.readFileSync('/etc/ssl/private/certificate.crt')
    }, app).listen(3000);
}
console.log(`SERVER IS LISTENING: 
NODE_ENV: ${process.env.NODE_ENV} 
PORT: ${port} 
PORT_DB: ${process.env.PORT_DB} 
HOST_DB: ${process.env.HOST_DB} 
PASS_DB: ${process.env.PASS_DB}
SEED: ${process.env.SEED}
RECAPTCHA_KEY: ${process.env.RECAPTCHA_KEY}
`);