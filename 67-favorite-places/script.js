// Save the API endpoint
var endpoint = 'https://vanillajsacademy.com/api/places.json';

/**
 * Add the favorite property to the places data
 * @param   {Object}  places         The places data
 * @returns {Object}  updatedPlaces  The places data with the favorite property
 */
function addFavoriteProperty(places) {
  var updatedPlaces = places.map(function(place) {
    place.favorite = false;
  });

  return updatedPlaces;
}

/**
 * Get the data from the API
 */
function getPlaces() {
  fetch(endpoint).then(function(response) {
    return response.ok ? response.json() : Promise.reject(response);
  }).then(function(data) {
    // Add the favorite property to the API data
    addFavoriteProperty(data);

    // Update the app data
    app.data.places = (data);
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
  return `${props.places.map(function(place, index) {
    return `<article>
      <div>
        <img src="${place.img}" alt="">
      </div>
      <div>
        <header>
          <h2>
            <a href="${place.url}">${place.place}</a>
          </h2>
          <button class="favorite" aria-label="Save ${place.place} to favorites" aria-pressed="${place.favorite}" data-index="${index}">
            <i class="fa fa-heart${place.favorite ? '' : '-o'}" aria-hidden="true"></i>
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
 * Toggle the favorite button
 * @param {Object} event The event object
 */
function toggleFavorite(event) {
  // If the event target has and attribute of data-index
  if (event.target.closest('[data-index]')) {
    // Get the value of data-index
    var index = event.target.closest('[data-index]').getAttribute('data-index');
    
    // Toggle the value of the favorite property
    app.data.places[index].favorite = app.data.places[index].favorite ? false : true;
  }
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
