var Client = require('../models/client').Client;

var randomString = function() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
};

module.exports = function(socket) {
  console.log('a new client is online');

  socket.on('info', function(data) {
    console.log('online client ip is ' + data.ip);
    console.log('online client mac is ' + data.mac);

    data.mac = data.mac.replace(/:/g, '-');
    data.mac = data.mac.toUpperCase();
    socket.data = data;

    var c = null;

    Client.findOne({where: {mac: data.mac}}).then((client) => {
      if (!client) {
        return Client.create({mac: data.mac, name: randomString(), isOnline:true});
      }
      c = client;
      client.isOnline = true;
      return client.save();
    }).then(function() {
      return c.getStates();
    }).then(function(states) {
      if (states.length && states[states.length - 1].state === 'online') {
        return Promise.resolve(null);
      }
      return c.createState({
        ip: data.ip,
        state: 'online'
      })
    });
  });

  socket.on('disconnect',function(){
    console.log('offline client mac is ' + socket.data.mac);
    var c = null;

    Client.findOne({where: {mac: socket.data.mac}}).then((client) => {
      client.isOnline = false;
      c = client;
      return client.save();
    }) .then(function(){
      return c.getStates();
    }).then(function(states) {
      if (states.length && states[states.length - 1].state === 'offline') {
        return Promise.resolve(null);
      }
      return c.createState({
        ip: socket.data.ip,
        state: 'offline'
      })
    });
  });
};