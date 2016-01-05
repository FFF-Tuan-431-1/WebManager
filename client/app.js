var socket = require('socket.io-client')('http://localhost:3000');
var ip = require('ip');

socket.on('connect', function(){
  console.log('connected to server');
  socket.emit('ip', ip.address());
});

socket.on('disconnect', function(){});