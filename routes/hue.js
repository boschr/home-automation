const request = require( "request" );
const color = require( "color" );

const Hue = (req, res) => {

    getLamps((lightCollection) => {
        res.render( "index", {
            title: "Hue lampen",
            lampCollection: lightCollection
        } );
    } );

};

const getLamps = (callback) => {
    const options = {
        url: "http://" + process.env.HUE_HOST + "/api/" + process.env.HUE_USER + "/lights",
        port: 80,
        method: "GET"
    };

    return request( options, ( error, response, lightCollection ) => {
        var parsedJson = JSON.parse( lightCollection );

        for( var key in parsedJson ) {
            var hue = parsedJson[key].state.hue / 182;
            var col = color().hsv(hue, parsedJson[key].state.sat, parsedJson[key].state.bri);

            parsedJson[key].state['hex'] = col.hexString();
        }

        // todo: repsonse code checken anders lege array retrun
        return callback( parsedJson );
    } );

    io.on( "connection", (socket) => {
        socket.on( "update-hue", function( message ){
            if( message.hueBody.hex ) {
                var col = color( message.hueBody.hex );

                message.hueBody.hue = col.hue() * 182;
                message.hueBody.bri = Math.round( col.lightness() / 100 * 255 );
                message.hueBody.sat = Math.round( col.saturationv() / 100 * 255 );
            }

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

}

module.exports = Hue;
