//REQUIREDS
const express = require('express');
const path = require('path');
const { CORS } = require('../middlewares/acceso');

const app = express();

app.use(CORS);

const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
    '.txt',
    '.json',
    '.webmanifest',
    '.gif',
];

app.get('', async(req, res) => {
    const host = req.headers.host;
    if (host.includes('gerardoarceo')) {
        res.redirect('/lienzourbano/tqm');
    } else {
        res.redirect('/tqm');
    }
});

app.get('*', async(req, res) => {
    req.url = req.url.split('?')[0];

    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve(`public/${req.url}`));
    } else {
        res.sendFile(path.resolve('public/index.html'));
    }
});

module.exports = app;