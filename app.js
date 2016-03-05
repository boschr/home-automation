"use strict";

require('dotenv').load();

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const http = require('http').createServer( app );
const io = require('socket.io').listen( http );

app.set('views', './public/view');
app.set('view engine', 'hbs');

// Define static folder, for asset include
app.use(
    express.static(
        path.join(__dirname, 'dist')
    )
);

app.use(
    bodyParser.urlencoded(
        { extended: false }
    )
);

hbs.registerPartials( __dirname + '/public/view/_partial');

var server = http.listen(8081, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log( 'App listening at http://%s:%s', host, port );
});

const hue = require('./routes/hue');

app.get('/', hue);
