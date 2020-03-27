// Dependencies 
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);
app.use('/static', express.static(__dirname + '/static'));// Routing
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/gm', function(request, response) {
  response.sendFile(path.join(__dirname, 'gm.html'));
});

  // Starts the server.
  server.listen(3000, function() {
  console.log('Starting server on port 3000');
});

var players = [];
var startingTeam = Math.floor(Math.random() * 2 + 1);
var currentTeam = startingTeam;

io.on('connection', function(socket) {
  var addedPlayer = false;

  // A new player has submitted their name
  socket.on('player registration', function(data, fn) {
    if (addedPlayer) return;
    socket.username = data.name;

    // add player to the players array
    playerInfo =  {
      name: data.name,
      team: currentTeam,
      isSpymaster: false,
      id: socket.id
    };
    players.push(playerInfo);

    //update player count (maybe deprecate this)
    addedPlayer = true;

    console.log('PLAYER JOINED: ' + data.name);
    // Send updated player list to everyone, including sender
    io.emit('player list', players);
    fn(playerInfo);

    // Switch teams
    if (currentTeam === 2) currentTeam = 1;
    else currentTeam = 2;

  });

  // GM has issued request for player list
  socket.on('get player list', function (fn) {
    console.log('GM has asked for player list');
    fn(players);
  });

  // GM manually makes a player a spymaster
  socket.on('make spymaster', function(playerId, fn) {
    // Find which player belongs to ID
    const currentPlayer = players.find( ({ id }) => id === playerId );
    console.log('Making spymaster out of ' + currentPlayer.name);
    // Demote any existing spymasters from player's team
    players.forEach(function(player, index) {
      if (player.team === currentPlayer.team){    
        this[index].isSpymaster = false;
      }
    }, players);
    // Make this player Spymaster
    currentPlayer.isSpymaster = true;
    // Send updated player list to everyone
    socket.broadcast.emit('player list', players);
    fn(players);
  });

  // GM manually assigns a player to a team
  socket.on('change team', function(playerId, newTeam, fn) {
    // Find which player belongs to ID
    const currentPlayer = players.find( ({ id }) => id === playerId );
    
    currentPlayer.team = newTeam;
    fn(players);
    socket.to(playerId).emit('change team', newTeam);
    socket.broadcast.emit('player list', players);

    });

  // What happens when a player disconnects
  socket.on('disconnect', function(data) {
    console.log("DISCONNECT FROM " + socket.id);
    socket.broadcast.emit('player disconnect');
  })

});

setInterval(function() {
  io.sockets.emit('state', players);
}, 1000 / 60);