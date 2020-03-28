var socket = io();
var playerInfo = {};
var myTurn = false;

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
  console.log('Board state updated');
  console.dir(tiles);
  for (i = 1; i <= 25; i++) {
    $('#tile-' + i).text(tiles[i].word);
    // Remove all existing teams from tile
    $('#tile-' + i).removeClass (function (index, className) {
      return (className.match (/team-[\d]/g) || []).join(' ');
  });
    if (!isNaN(tiles[i].color)) $('#tile-' + i).addClass('team-' + tiles[i].color);
  }
});

socket.on('your turn', function() {
  alert('Your turn!');
  $('body').addClass('my-turn');
  myTurn = true;
})

// jQuery Stuff
$( document ).ready(function() {
  $('#enter-name-button').on('click', function(event) {
    event.preventDefault();
    registerPlayer();
  });

  $('#test').on('click', function(event) {
    console.dir(playerInfo);
  });

  $('body .tile').on('click', function(event) {
    if (!myTurn) return;
    $('.tile').removeClass('selected');
    $(this).addClass('selected');
    whichTile = $(this).attr('id');
    socket.emit('choice made', playerInfo.name, whichTile);
  });
});
