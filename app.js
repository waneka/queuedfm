/**
 * DB configuration
 **/
require('./db/models.js').initialize();
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/queued')
var Song = mongoose.model('Song')



/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var api = require('./routes/api')
// var user = require('./routes/user');
var http = require('http');
var path = require('path');
var sio = require('socket.io')

var app = express();
var server = http.createServer(app)
var io = sio.listen(server)

// all environments
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/api/party/:url', api.loadParty)
app.get('/api/join_party/:name', api.joinParty)

app.post('/api/new_party', api.newParty)
// app.post('parties/join', routes.join_party)

io.sockets.on('connection', function(socket) {
  socket.emit('news', { hello: 'world' })
  socket.on('my other event', function(data) {
    console.log(data)
  })
})
