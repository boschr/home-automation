require('dotenv').load();

const OZW = require('openzwave-shared');

const Zwave = (req, res, io) => {
  const zwave = new OZW({
    Logging: false,
  });

  const nodeList = [];

  zwave.connect(process.env.ZWAVE_USB);

  zwave.on('node added', (nodeid) => {
    console.log('node added: ', nodeid);
  });

  zwave.on('node ready', (nodeid, nodeinfo) => {
    console.log('node naming: ', nodeid, nodeinfo);

    nodeinfo['nodeid'] = nodeid;

    nodeList.push(nodeinfo);
  });

  zwave.on('scan complete', () => {
    console.log('== SCAN COMPLETE');

    res.render('zwave', {
      title: 'Zwave page title',
      nodeCollection: nodeList,
    });
  });

  io.on('connection', (socket) => {
    socket.on('update-zwave-list', (message) => {
      console.log('UPDATE LIST !!!!!!1');
    });
  });

}

module.exports = Zwave;
