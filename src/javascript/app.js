const io = require('socket.io-client');
const jQuery = require('jquery');

(($) => {
  const socket = io();

  $('[data-type="hue"]').on('change', (event) => {
    event.preventDefault();

    const $form = $(this);
    const lightId = $form.attr('data-target');

    const message = {
      lightId,
      hueBody: {
        on: $('[name="on"]', $form).is(':checked'),
        hex: $('[name="hex"]', $form).val(),
        bri: parseInt($('[name="bri"]', $form).val(), 10),
      },
    };

    socket.emit('update-hue', message);
  });


  // -- Zwave

  $('.js-refresh').on('click', () => {
    socket.emit('update-zwave-list');
  });

  socket.on('node-collection', (nodeCollection) => {
    console.log('Node list recieved: ', nodeCollection);
  });
})(jQuery);
