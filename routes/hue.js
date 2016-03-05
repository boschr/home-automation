require('dotenv').load();

const request = require('request');
const color = require('color');
const eventService = require('../controller/service/event');

const getLamps = (callback) => {
  const requestOptions = {
    url: 'http://' + process.env.HUE_HOST + '/api/' + process.env.HUE_USER + '/lights',
    port: 80,
    method: 'GET',
  };

  return request(requestOptions, (error, response, lightCollection) => {
    const parsedJson = JSON.parse(lightCollection);

    for (const key in parsedJson) {
      if (parsedJson.hasOwnProperty(key)) {
        const hue = parsedJson[key].state.hue / 182;
        const col = color().hsv(hue, parsedJson[key].state.sat, parsedJson[key].state.bri);

        parsedJson[key].state.hex = col.hexString();
      }
    }

    // todo: repsonse code checken anders lege array retrun
    return callback(parsedJson);
  });

  eventService.on('connection', (socket) => {
    eventService.on('hue.update', (message) => {
      console.log('hue.update');
      if(message.hueBody.hex) {
        const col = color(message.hueBody.hex);

        message.hueBody.hue = col.hue() * 182;
        message.hueBody.bri = Math.round(col.lightness() / 100 * 255);
        message.hueBody.sat = Math.round(col.saturationv() / 100 * 255);
      }

      const options = {
        url: 'http://' + process.env.HUE_HOST + '/api/' + process.env.HUE_USER + '/lights/' + message.lightId + '/state',
        method: 'PUT',
        body: JSON.stringify(message.hueBody),
      };

      return request(options, (error, response, returnBody) => {
        console.log(returnBody);
      });
    });
  });
};

const Hue = (req, res) => {
  getLamps((lightCollection) => {
    res.render('index', {
      title: 'Hue lampen',
      lampCollection: lightCollection,
    });
  });
};

module.exports = Hue;
