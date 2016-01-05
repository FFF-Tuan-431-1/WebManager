var Client = require('../models/client').Client;

var randomString = function() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
};

module.exports = function(socket) {
  console.log('a new client is online');

  socket.on('info', function(data) {
    console.log('remote client ip is ' + data.ip);
    console.log('remote client mac is ' + data.mac);

    socket.data = data;

    Client.findOne({where: {mac: data.mac}}).then((client) => {
      if (!client) {
        return Client.create({mac: data.mac, name: randomString(), isOnline:true});
      }
      client.isOnline = true;
      client.save();
      return Promise.resolve(client);
    }).then(function(client) {
     return client.createState({
        ip:data.ip,
        state: 'online'
      });
    });
  })

  socket.on('disconnect',function(){
    console.log(socket.data.mac);
    Client.findOne({where:{mac:socket.data.mac}}).then((client) => {
      client.isOnline = false;
      client.save();
      return Promise.resolve(client);
    }) .then(function(client){
      return client.createState({
        ip:socket.data.ip,
        state:'offline'
      })
    })
  })
};