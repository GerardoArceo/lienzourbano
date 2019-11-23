//REQUIREDS
const express = require('express');
const path = require('path');

const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json({ limit: '10mb', extended: true }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// app.use(require('./routes/index'));

// Serve static files....
app.use(express.static(__dirname + '/dist/lienzourbano'));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Send all requests to index.html
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/lienzourbano/index.html'));
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);