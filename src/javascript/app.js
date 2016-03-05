const io = require('socket.io-client');

( function( $ ) {

    var socket = io();

    $( "[data-type='hue']" ).on( "change", function( event ) {
        event.preventDefault();

        var $form = $( this );
        var lightId = $form.attr( "data-target" );

        var message = {
            lightId: lightId,
            hueBody: {
                on:   $( "[name='on']", $form ).is( ":checked" ),
                hex:  $( "[name='hex']", $form ).val(),
                bri:  parseInt( $( "[name='bri']", $form ).val(), 10 )
            }
        };

        socket.emit( "update-hue", message );
    } );



    // -- Zwave

    $( ".js-refresh" ).on("click", function () {
        socket.emit( "update-zwave-list" );
    });

    socket.on('node-collection', function(nodeCollection) {
        console.log('Node list recieved: ', nodeCollection);
    });

} )( require( "jquery" ) );
