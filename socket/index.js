module.exports = function(socket) {
  console.log('a new client is online');

  socket.on('ip', function(ipAddr) {
    console.log('remote client ip is ' + ipAddr);
  })
};