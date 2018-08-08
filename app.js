/**
 *  webrtc-server project
 *
 */
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var open = require('open');
let isLocal = process.env.PORT == null;
var serverPort = (process.env.PORT  || 3001);
var Port=(process.env.PORT  || 3000);;
var server = null;
if (isLocal) {
server = require('http').createServer(app);
} else {
  server = require('http').createServer(app);
}
var io = require('socket.io')(server);

//------------------------------------------------------------------------------
server.listen(serverPort, function(){
  console.log('  server is up and running at %s port', serverPort);
});
server.listen(Port, function(){
    console.log('live is up and running at %s port', Port);

});
//------------------------------------------------------------------------------
//  WebRTC Signaling
io.on('connection', function(socket){
  console.log('Connection');
  socket.broadcast.on('Join', function(data){
    console.log('Join: ', Data);
  });
  socket.on('exchange', function(data){

  });

});
