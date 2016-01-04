module.exports = function(socket) {
  console.log('1111');

  socket.emit('msg', {
    msg: 'Hello, world!'
  });
};