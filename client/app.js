var socket = require('socket.io-client')('http://localhost:3000');
var ip = require('ip');
var getmac = require('getmac');

socket.on('connect', function(){
  console.log('connected to server');
  getmac.getMac((err, mac) => {
    socket.emit('info', {
      ip: ip.address(),
      mac: mac
    });
  });
});

socket.on('disconnect', function(){
});