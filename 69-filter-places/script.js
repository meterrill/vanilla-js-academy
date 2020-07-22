// Save the API endpoint
var endpoint = 'https://vanillajsacademy.com/api/places.json';

// Save the localStorage keys
var favoritesID = 'favoritePlaces';
var visitedID = 'visitedPlaces';

/**
 * Get the saved object from localStorage
 * @param   {String}  key    The localStorage key
 * @returns {Object}  saved  The saved object
 */
function getFromStorage(key) {
  // Get the saved object from localStorage
  var saved = JSON.parse(localStorage.getItem(key));

  // Return the saved object
  return saved ? saved: {};
}

/**
 * Save the object to localStorage
 * @param {String} key    The localStorage key
 * @param {Object} object The object to save
 */
function saveToStorage(key, object) {
  // Save the object to localStorage
  localStorage.setItem(key, JSON.stringify(object));
}

/**
 * Get the data from the API
 */
function getPlaces() {
  fetch(endpoint).then(function(response) {
    return response.ok ? response.json() : Promise.reject(response);
  }).then(function(data) {
    // Add the favorites object to the API data
    app.data.favorites = getFromStorage(favoritesID);

    // Add the visited object to the API data
    app.data.visited = getFromStorage(visitedID);

    // Add the filter object to the API data
    app.data.filter = 'all';

    // Update the app data
    app.data.places = data;
  }).catch(function(error) {
    console.warn(error);
    app.data.place = null;
  });
}

/**
 * Get the hidden places based on the selected filter
 * @param {Object} props The props object
 * @param {Object} place The place object
 */
function getHidden(props, place) {
  // If filter is "not visited" and place has been visited, hide it
  if (props.filter === 'not-visited' && props.visited[place.id]) return 'hidden';

  // If filter is "favorites" or "visited" and place has not been favorited or visited, hide it
  if (props[props.filter] && !props[props.filter][place.id]) return 'hidden';

  // Otherwise, show it
  return '';
}

/**
 * Create HTML for the places
 * @param   {Object} props The places data
 * @returns {String}       The HTML
 */
function getPlacesHTML(props) {
  return `${props.places.map(function(place) {
    return `<article ${getHidden(props, place)}>
      <div>
        <img src="${place.img}" alt="">
      </div>
      <div>
        <header>
          <h2>
            <a href="${place.url}">${place.place}</a>
          </h2>
          <div>
            <button data-object="favorites" data-id="${place.id}" aria-label="Save ${place.place} to favorites" aria-pressed="${props.favorites[place.id]}">
              <i class="fa fa-heart${props.favorites[place.id] ? '' : '-o'}" aria-hidden="true"></i>
            </button>
            <button data-object="visited" data-id="${place.id}" aria-label="Save ${place.place} to visited" aria-pressed="${props.visited[place.id]}">
              <i class="fa fa-${props.visited[place.id] ? 'check-' : ''}square-o" aria-hidden="true"></i>
            </button>
          </div>
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

/**
 * Handle change events
 * @param {Event} event The event object
 */
function changeHandler(event) {
  if (event.target.closest('.filters')) {
    // Update the filter value
    app.data.filter = event.target.value;
  }
}

/**
 * Handle click events
 * @param {Object} event The event object
 */
function clickHandler(event) {
  // If the event target has an attribute of data-object
  if (event.target.closest('[data-object]')) {
    // Get the value of data-object
    var object = event.target.closest('[data-object]').getAttribute('data-object');

    // Get the value of data-id
    var id = event.target.closest('[data-id]').getAttribute('data-id');

    // Toggle the place's favorites value
    app.data[object][id] = app.data[object][id] ? false : true;
  }
}

/**
 * Handle render events
 * @param {Event} event The event object
 */
function renderHandler(event) {
  // Save the favorites object to localStorage
  saveToStorage(favoritesID, app.data.favorites);

  // Save the visited object to localStorage
  saveToStorage(visitedID, app.data.visited);
}

getPlaces();

// Listen for changes to the filters
window.addEventListener('change', changeHandler);

// Listen for clicks on buttons
window.addEventListener('click', clickHandler);

// Listen for updates to the DOM
window.addEventListener('render', renderHandler);
