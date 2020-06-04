// The monsters and socks
var monsters = [
  {
    src: 'monster1',
    alt: 'A yellow monster with one big eye, a curly nose, and a tail.'
  },
  {
    src: 'monster2',
    alt: 'A yellow monster with one big eye, two long arms, and two long legs.'
  },
  {
    src: 'monster3',
    alt: 'A green monster with two big eyes, wavy arms, and sharp teeth running down its body.'
  },
  {
    src: 'monster4',
    alt: 'A red monster with 2 small eyes, four arms, and downturned horns.'
  },
  {
    src: 'monster5',
    alt: 'A green monster with one big eye and a glum expression.'
  },
  {
    src: 'monster6',
    alt: 'A green monster with one eye and a triangular body doing a handstand.'
  },
  {
    src: 'monster7',
    alt: 'A purple monster with one big eye and two tentacles for arms.'
  },
  {
    src: 'monster8',
    alt: 'A purple monster with an egg-shaped body, one eye, and no arms or legs.'
  },
  {
    src: 'monster9',
    alt: 'A blue, insect-like monster with two eyes, two arms, three legs, and four wings.'
  },
  {
    src: 'monster10',
    alt: 'A blue, stalk-eyed monster with two small legs and no arms.'
  },
  {
    src: 'monster11',
    alt: 'A black, yeti-like monster with a big smile.'
  },
  {
    src: 'sock',
    alt: 'A pair of socks.'
  }
];

// Get the #app element
var app = document.querySelector('#app');

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {Array}       The shuffled array
 */
var shuffle = function (array) {

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

};

// Shuffle monsters
var shuffledMonsters = shuffle(monsters);

// Display a door in the DOM for each monster
app.innerHTML = `<div class="row">
                  ${shuffledMonsters.map(function (monster, index) {
                    return `<div class="grid">
                      <button>
                        <img data-index="${index}" src="img/door.svg" alt="Click to open the door.">
                      </button>
                    </div>`
                  }).join('')}
                </div>`;

// Listen for clicks on the doors
app.addEventListener('click', function(event) {
  // If the selected element has a data-index attribute
  if (event.target.matches('[data-index]')) {
    // Get the closest .grid element
    var selectedGrid = event.target.closest('.grid');
    // Get the corresponding monster
    var selectedMonster = shuffledMonsters[event.target.dataset.index];
    // Replace the selected door with the corresponding monster
    selectedGrid.innerHTML = `<img src="img/${selectedMonster.src}.svg" alt="${selectedMonster.alt}">`;
  }
});
