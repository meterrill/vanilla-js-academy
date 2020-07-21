// Save the API endpoint
var endpoint = 'https://vanillajsacademy.com/api/places.json';

// Save the localStorage key
var storageID = 'favoritePlaces';

/**
 * Add the favorites object to the data
 * @returns {Object}  favorites  The favorites object
 */
function getFavorites() {
  // Get the favorites object from localStorage
  var favorites = JSON.parse(localStorage.getItem(storageID));

  // Return the favorites object
  return favorites ? favorites: {};
}

/**
 * Save the favorites object to localStorage
 * @param {Object} favorites The favorites object
 */
function saveFavorites(favorites) {
  // Save the favorites object to localStorage
  localStorage.setItem(storageID, JSON.stringify(favorites));
}

/**
 * Toggle the favorite button
 * @param {Object} event The event object
 */
function toggleFavorite(event) {
  // If the event target has an attribute of data-id
  if (event.target.closest('[data-id]')) {
    // Get the value of data-id
    var id = event.target.closest('[data-id]').getAttribute('data-id');

    // Toggle the place's favorites value
    app.data.favorites[id] = app.data.favorites[id] ? false : true;
  }
}

/**
 * Handle render events
 * @param {Event} event The event object
 */
function renderHandler(event) {
  // Save the favorites object to localStorage
  saveFavorites(app.data.favorites);
}

/**
 * Get the data from the API
 */
function getPlaces() {
  fetch(endpoint).then(function(response) {
    return response.ok ? response.json() : Promise.reject(response);
  }).then(function(data) {
    // Add the favorites object to the API data
    app.data.favorites = getFavorites();

    // Update the app data
    app.data.places = data;
  }).catch(function(error) {
    console.warn(error);
    app.data.place = null;
  });
}

/**
 * Create HTML for the places
 * @param   {Object} props The places data
 * @returns {String}       The HTML
 */
function getPlacesHTML(props) {
  return `${props.places.map(function(place) {
    return `<article>
      <div>
        <img src="${place.img}" alt="">
      </div>
      <div>
        <header>
          <h2>
            <a href="${place.url}">${place.place}</a>
          </h2>
          <button data-id="${place.id}" aria-label="Save ${place.place} to favorites" aria-pressed="${props.favorites[place.id]}">
            <i class="fa fa-heart${props.favorites[place.id] ? '' : '-o'}" aria-hidden="true"></i>
          </button>
        </header>
        <p>${place.description}</p>
        <address>${place.location}</address>
      </div>
    </article>`;
  }).join('')}`;
}

/**
 * Create HTML for no places
 * @returns {String}  The HTML
 */
function getNoPlacesHTML() {
  return `<p><em>Sorry, we're unable to find any places right now. Please try again later.</em></p>`;
}

/**
 * Create a new Reef instance
 */
var app = new Reef('#app', {
  data: {},
  template: function(props) {
    // Display places
    if (props.places && props.places.length) {
      return getPlacesHTML(props);
    }

    // Display error
    return getNoPlacesHTML();
  }
});

getPlaces();

// Listen for clicks on favorite buttons
window.addEventListener('click', toggleFavorite);

// Listen for updates to the DOM
window.addEventListener('render', renderHandler);
