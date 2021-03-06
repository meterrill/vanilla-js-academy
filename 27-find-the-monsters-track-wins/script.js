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

// Initialize count
var count = 0;

// Get the #app element
var app = document.querySelector('#app');

// Get #resultModal element
var resultModal = document.querySelector('#resultModal');

// Get #resultMessage element
var resultMessage = document.querySelector('#resultMessage');

// Get #play-again element
var playAgain = document.querySelector('#play-again');

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

function showGame() {
  // Shuffle monsters
  shuffle(monsters);
  
  // Display a door in the DOM for each monster
  app.innerHTML = `<p>Click a door to reveal a monster. Try not to find the socks.</p>
                  <div class="row">
                    ${monsters.map(function (monster, index) {
                      return `<div class="grid" aria-live="polite">
                        <button data-index="${index}">
                          <img src="img/door.svg" alt="Click to open the door.">
                        </button>
                      </div>`
                    }).join('')}
                  </div>`;
  
  // Reset count
  count = 0;
}  

function showModal(result) {
  resultMessage.innerText = result;
  resultModal.style.display = 'block';
}

// Listen for clicks on the doors
app.addEventListener('click', function (event) {
  // Get the element or closest parent with a [data-index] attribute
  var selectedDoor = event.target.closest('[data-index]');
  // If the selected element has a data-index attribute
  if (selectedDoor) {
    // Get the corresponding monster
    var selectedMonster = monsters[selectedDoor.dataset.index];
    // Get the closest .grid element
    var selectedGrid = event.target.closest('.grid');
    // Replace the selected door with the corresponding monster
    selectedGrid.innerHTML = `<img src="img/${selectedMonster.src}.svg" alt="${selectedMonster.alt}">`;

    if (selectedMonster.src === 'sock') {
      showModal('You lose!');
    } else {
      count++;
      if (count >= (monsters.length - 1)) {
        showModal('You win!');
      }
    }
  }
});

playAgain.addEventListener('click', function() {
  resultModal.style.display = 'none';
  showGame();
});

showGame();
