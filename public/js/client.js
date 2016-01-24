// CSS
require( "../css/screen.scss" );

// JS
// todo: is dit DE manier??
var io = require( "socket.io/node_modules/socket.io-client" );

( function( $ ) {

    var socket = io();

    var hue_range       = document.querySelectorAll('.hue__input--range'),
        hue_checkbox    = document.querySelectorAll('.hue__input--checkbox')

    for (var i = 0; i < hue_range.length; i++) {
        hue_range[i].addEventListener('input', function(){
            setHue();
        })
    }

    for (var i = 0; i < hue_checkbox.length; i++) {
        hue_checkbox[i].addEventListener('change', function(){
            setHue();
        })
    }

    function setHue() {
        $form = $('#hue__form');
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
    }

} )( require( "jquery" ) );
