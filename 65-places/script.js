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
    console.warn('Something went wrong.', error);
  });
}

/**
 * Create HTML for the places
 * @param   {Object} props The places data
 * @returns {String}       The HTML
 */
function getPlacesHTML(props) {
  return `
    <ul>
      ${props.places.map(function(place) {
        return `<li>${place.place}</li>`;
      }).join('')}
    </ul>
  `;
}

getPlaces();
