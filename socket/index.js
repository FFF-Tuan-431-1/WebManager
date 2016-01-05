module.exports = function(socket) {
  console.log('a new client is online');

  socket.on('info', function(data) {
    console.log('remote client ip is ' + data.ip);
    console.log('remote client mac is ' + data.mac);
  })
};