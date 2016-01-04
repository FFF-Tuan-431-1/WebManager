var socket = require('socket.io-client')('http://localhost:3000');

socket.on('connect', function(){
  console.log('!!!');
});
socket.on('msg', function(data){
  console.log(data);
});

socket.on('disconnect', function(){});