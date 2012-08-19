
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , socketIO = require('socket.io')
  , user = require('./models/user')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('controllers', __dirname + '/controllers');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});



var server = http.createServer(app).listen(app.get('port'),function(){
  console.log("Express server listening on port " + app.get('port'));
});

//Wait the connection of client
var io = socketIO.listen(server);
app.configure('production', function(){
  io.configure(function(){
    io.set("transports", ["xhr-polling"]);
    io.set("polling duration", 10);
  });
});

//When the clients connect
io.sockets.on('connection', function(socket){
  console.log('connection');

  //Receive messaeg
  socket.on('message', function(msg){

    //Submit all connecting clients
    console.log('message');
    io.sockets.emit('message', msg);
  });

  //When the clients disconnect
  socket.on('disconnect', function(){
    console.log('disconnect');
  });
});



// Routes
app.get('/', routes.index);
app.get('/users',routes.users.index);
app.get('/users/new', routes.users.new);
app.get('/users/:id',routes.users.show);
app.get('/users/:id/edit',routes.users.edit);
app.post('/users',routes.users.create);
app.put('/users/:id', routes.users.update);
app.del('/users/:id', routes.users.destroy);
