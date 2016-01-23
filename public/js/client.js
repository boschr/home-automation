// CSS
require( "../css/screen.scss" );

// JS
// todo: is dit DE manier??
var io = require( "socket.io/node_modules/socket.io-client" );

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
                hue:  parseInt( $( "[name='hue']", $form ).val(), 10 ),
                bri:  parseInt( $( "[name='bri']", $form ).val(), 10 ),
                sat:  parseInt( $( "[name='sat']", $form ).val(), 10 )
            }
        };

        socket.emit( "update-hue", message );
    } );

} )( require( "jquery" ) );
