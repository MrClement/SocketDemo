const express = require('express');
const app = express();
const server = require('http')
  .Server(app);
const io = require('socket.io')(server);

app.get('/', function(req, res) {
  res.send("Hello, world!");
});

app.get('/chat', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('A wild user appeared!');

  socket.on('chat message', function(msg) {
    //console.log("message: " + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function() {
    console.log('Wild user fled :(')
  });
});

server.listen(3000, function() {
  console.log("Server started!");
});
