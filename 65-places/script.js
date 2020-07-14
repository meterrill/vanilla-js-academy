var endpoint = 'https://vanillajsacademy.com/api/places.json';

/**
 * Create a new Reef instance
 */
var app = new Reef('#app', {
  data: {
    greeting: 'Hello'
  },
  template: function(props) {
    return `<p>${props.greeting}</p>`;
  }
});

app.render();

/**
 * Get the data from the API
 */
fetch(endpoint).then(function(response) {
  return response.ok ? response.json() : Promise.reject(response);
}).then(function(data) {
  console.log(data);
}).catch(function(error) {
  console.warn('Something went wrong.', error);
});
