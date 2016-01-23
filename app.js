"use strict";

/*
    * https://www.airpair.com/node.js/posts/top-10-mistakes-node-developers-make
*/


require( "dotenv" ).load();

var   express = require( "express" )
    , path = require( "path" )
    , hbs = require( "hbs" )
    , app = express()
    , bodyParser = require( "body-parser" )
    , request = require( "request" )
    , http = require( "http" ).createServer( app )
    , io = require( "socket.io" ).listen( http )
    ;

app.set( "views", "./public/view" );
app.set( "view engine", "hbs" );

// Define static folder, for asset include
app.use(
    express.static(
        path.join( __dirname, 'public' )
    )
);

app.use(
    bodyParser.urlencoded(
        { extended: false }
    )
);

hbs.registerPartials( __dirname + "/public/view/_partial" );


io.on( "connection", function( socket ){
    socket.on( "update-hue", function( message ){
        console.log( message );

        var options = {
            url: "http://" + process.env.HUE_HOST + "/api/" + process.env.HUE_USER + "/lights/" + message.lightId + '/state',
            method: "PUT",
            body: JSON.stringify( message.hueBody )
        };

        return request( options, function( error, response, returnBody ) {

            console.log( returnBody );

        } );
    });
});

var server = http.listen(8081, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log( 'App listening at http://%s:%s', host, port );
});


app.get( "/", function(req, res) {

    getLamps( function( lightCollection ) {

        res.render( "index", {
            title: "Hue lampen",
            lampCollection: lightCollection
        } );

    } );

} );

function getLamps( callback ) {

    var options = {
        url: "http://" + process.env.HUE_HOST + "/api/" + process.env.HUE_USER + "/lights",
        port: 80,
        method: "GET"
    };

    return request( options, function( error, response, lightCollection ) {
        // todo: repsonse code checken anders lege array retrun
        return callback( JSON.parse( lightCollection ) );
    } );

}
