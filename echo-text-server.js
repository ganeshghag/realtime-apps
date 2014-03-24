var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var html = fs.readFileSync('./client/echo-text-client.html', 'utf8');
function handler (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
}

io.sockets.on('connection', function (socket) {
  socket.on('messages', function (data) {
    //console.log('from server received:'+data);
    io.sockets.send(data);
  });
});

app.listen(process.env.PORT);



//function tick () {
//    var now = new Date().toUTCString();
//    io.sockets.send("time now="+now);
//}
//setInterval(tick, 2000);
