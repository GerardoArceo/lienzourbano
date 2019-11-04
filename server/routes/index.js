//REQUIREDS
const express = require('express');

const app = express();

app.use(require('./imagen'));
app.use(require('./login'));
app.use(require('./api'));

module.exports = app;