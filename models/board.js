
const cardColors = [3,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2]


const wordList = [
  'africa',
  'agent',
  'air',
  'alien',
  'amazon',
  'angel',
  'antarctica',
  'apple',
  'arm',
  'back',
  'band',
  'bank',
  'bark',
  'beach',
  'belt',
  'berlin',
  'berry',
  'board',
  'bond',
  'boom',
  'bow',
  'box',
  'bug',
  'canada',
  'capital',
  'cell',
  'center',
  'china',
  'chocolate',
  'circle',
  'club',
  'compound',
  'copper',
  'crash',
  'cricket',
  'cross',
  'death',
  'dice',
  'dinosaur',
  'doctor',
  'dog',
  'dress',
  'dwarf',
  'eagle',
  'egypt',
  'engine',
  'england',
  'europe',
  'eye',
  'fair',
  'fall',
  'fan',
  'field',
  'file',
  'film',
  'fish',
  'flute',
  'fly',
  'forest',
  'fork',
  'france',
  'gas',
  'ghost',
  'giant',
  'glass',
  'glove',
  'gold',
  'grass',
  'greece',
  'green',
  'ham',
  'head',
  'himalaya',
  'hole',
  'hood',
  'hook',
  'human',
  'horseshoe',
  'hospital',
  'hotel',
  'ice',
  'ice cream',
  'india',
  'iron',
  'ivory',
  'jam',
  'jet',
  'jupiter',
  'kangaroo',
  'ketchup',
  'kid',
  'king',
  'kiwi',
  'knife',
  'knight',
  'lab',
  'lap',
  'laser',
  'lawyer',
  'lead',
  'lemon',
  'limousine',
  'leadlock',
  'log',
  'mammoth',
  'maple',
  'march',
  'mass',
  'mercury',
  'millionaire',
  'model',
  'mole',
  'moscow',
  'mouth',
  'mug',
  'needle',
  'net',
  'new york',
  'night',
  'note',
  'novel',
  'nurse',
  'nut',
  'oil',
  'olive',
  'olympus',
  'opera',
  'orange',
  'paper',
  'park',
  'part',
  'paste',
  'phoenix',
  'piano',
  'telescope',
  'teacher',
  'switch',
  'swing',
  'sub',
  'stick',
  'staff',
  'stadium',
  'sprint',
  'spike',
  'snowman',
  'slip',
  'shot',
  'shadow',
  'server',
  'ruler',
  'row',
  'rose',
  'root',
  'rome',
  'rock',
  'robot',
  'robin',
  'revolution',
  'rat',
  'racket',
  'queen',
  'press',
  'port',
  'pilot',
  'time',
  'tooth',
  'tower',
  'truck',
  'triangle',
  'trip',
  'turkey',
  'undertaker',
  'unicorn',
  'vacuum',
  'van',
  'wake',
  'wall',
  'war',
  'washer',
  'washington',
  'water',
  'wave',
  'well',
  'whale',
  'whip',
  'worm',
  'yard'
]

function GameBoard() {

  // Create empty array of tiles
  this.tiles = [];
  // Populate words array with 25 random words
  this.words = shuffle(wordList).slice(0,25);

  // Choose which team (Red = 1, Blue = 2) goes first
  this.firstTeam = Math.floor(Math.random() * 2 ) + 1;
  this.colors = shuffle(cardColors);

  // Add one more tile, of the color of the starting team.
  this.colors.push(this.firstTeam);

  // Populate tiles array with objects containing word and color
  for ( let i = 1; i <= 25; i++) {
    this.tiles[i] = {
      word: this.words[i-1],
      color: this.colors[i-1]
    }
    console.log('Tile number ' + i + ': Word is ' + this.tiles[i].word + ' and team is ' + this.tiles[i].color)
  }
}

const shuffle = (array) => {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  } 
  return array;
}

var board = new GameBoard;
console.log('NEW BOARD:' + board);
module.exports = board;