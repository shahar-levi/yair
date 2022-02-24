'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
const Dig = require('./Dig');
const dmarc = require('dmarc-parse');

app.disable('x-powered-by');

app.use('/public', express.static(path.join(__dirname, '/public'), {
    maxAge: 0,
    dotfiles: 'ignore',
    etag: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname) + '/views/index.html');
});

app.get('/api/lookup/:domain', async (req, res) => {
    const dig = new Dig(req.params.domain);
    try {
        const lookup = await dig.lookup();
        console.log(lookup);
        let tags = dmarc(lookup);
        res.send(tags);
    } catch(err) {
        res.send(err);
    }
});


if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
    });
}

app.use((err, req, res, next) => {
    res.status(err.status || 500);
});

app.listen(port);
