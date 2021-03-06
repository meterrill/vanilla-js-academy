var endpoint = 'https://vanillajsacademy.com/api/places.json';

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
 * Get the data from the API
 */
function getPlaces() {
  fetch(endpoint).then(function(response) {
    return response.ok ? response.json() : Promise.reject(response);
  }).then(function(data) {
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
  return `${props.places.map(function(place) {
    return `<article>
      <div>
        <img src="${place.img}" alt="">
      </div>
      <div>
        <h2>
          <a href="${place.url}">${place.place}</a>
        </h2>
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

getPlaces();
