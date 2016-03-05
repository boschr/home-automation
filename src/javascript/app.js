const io = require('socket.io-client');
const jQuery = require('jquery');

(($) => {
  const socket = io();

  $('[data-type="hue"]').on('change', function(event) {
    event.preventDefault();

    const $form = $(this);
    const lightId = $form.data('target');

    const message = {
      lightId: lightId,
      hueBody: {
        on: $('[name="on"]', $form).is(':checked'),
        hex: $('[name="hex"]', $form).val(),
        bri: parseInt($('[name="bri"]', $form).val(), 10),
      },
    };

    socket.emit('hue.update', message);
  });


  // -- Zwave

  $('.js-refresh').on('click', () => {
    socket.emit('update-zwave-list');
  });

  socket.on('node-collection', (nodeCollection) => {
    console.log('Node list recieved: ', nodeCollection);
  });
})(jQuery);
