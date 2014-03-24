var express = require('express');
var path = require('path');
var router = express();
router.use(express.static(path.resolve(__dirname, 'client')));

var app = require('http').createServer(router);
var io = require('socket.io').listen(app);

io.sockets.on('connection', function (socket) {
  socket.on('messages', function (data) {
    //console.log('from server received:'+data);
    io.sockets.send(data);
  });
});

app.listen(process.env.PORT);


var toggle = true;
function updateGraphData() {
    if(toggle){
         io.sockets.send("70,60,50,40,30,20,10");
        toggle = false;
    }else{
         io.sockets.send("10,20,30,40,50,60,70");
        toggle = true;
    }
   
}

setInterval(updateGraphData, 2000);
