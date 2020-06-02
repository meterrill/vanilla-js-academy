// The monsters and socks
var monsters = [
  'monster1',
  'monster2',
  'monster3',
  'monster4',
  'monster5',
  'monster6',
  'monster7',
  'monster8',
  'monster9',
  'monster10',
  'monster11',
  'sock'
];

// Get the #app element
var app = document.querySelector('#app');

// Display monsters in the DOM
app.innerHTML = `<div class="row">
                  ${monsters.map(function(monster) {
                    return `<div class="grid">
                      <img src="img/${monster}.svg" alt="${monster}">
                    </div>`
                  }).join('')}
                </div>`;
