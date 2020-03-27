var socket = io();
var playerInfo = {};
socket.on('message', function(data) {
  console.log('MESSAGE: ' +data);
});

socket.on('player info', function({name, team}) {
  console.log('I am on team ' + team);
  $('#player-login').hide();
  $('#play-area').show();
  $('#player-name-display').text(name);
  $('#player-name-display').addClass('team-' + team);
})

socket.on('you are spymaster', function(data) {
  alert('You are spymaster now!');
  $('.spymaster').show();
});

socket.on('change team', function(newTeam) {
  console.log('Change team to ' + newTeam);
  $('#player-name-display').removeClass('team-1');
  $('#player-name-display').removeClass('team-2');
  $('#player-name-display').addClass('team-' + newTeam);

})

function registerPlayer() {
  playerInfo = {
    name: $('#player-name').val()
  }
  socket.emit('player registration', playerInfo, function(registeredPlayer) {
    console.dir(registeredPlayer);
    $('#player-login').hide();
    $('#play-area').show();
    $('#player-name-display').text(registeredPlayer.name);
    $('#player-name-display').addClass('team-' + registeredPlayer.team);
    playerInfo = registeredPlayer;
  });
}

socket.on('player list', function(playerList) {
  console.log('UPDATED PLAYER LIST RECEIVED');
  $('#player-list').empty();
  for (player of playerList) {
    smTag = (player.isSpymaster) ? ' 🌟' :'';
    $('#player-list').append('<li class="team-' + player.team + '">' + player.name + smTag + '</li>');
  }
});

socket.on('start game', function() {
  $('#game-board').css('display', 'flex');
  console.log('GAME STARTING');
});

socket.on('board state', function(tiles) {
  console.dir(tiles);
  for (i = 1; i <= 25; i++) {
    $('#tile-' + i).text(tiles[i].word);
  }
})

$('#enter-name-button').on('click', function(event) {
  event.preventDefault();
  registerPlayer();
});

$('#test').on('click', function(event) {
  console.dir(playerInfo);
})