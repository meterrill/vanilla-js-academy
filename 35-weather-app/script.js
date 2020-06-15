// Get #app element
var app = document.querySelector('#app');

// Get user's location
fetch('https://ipapi.co/json/').then(function(response) {
  return response.ok ? response.json() : Promise.reject(response);
}).then(function(data) {
  // Store the location data
  var location = data;
  // Get the current weather
  return fetch(`https://api.weatherbit.io/v2.0/current?city=${location.city},${location.region_code}&key=418c15fc4a2b4812936ccb24faa2532d`);
}).then(function(response) {
  return response.ok ? response.json() : Promise.reject(response);
}).then(function(weatherData) {
  console.log(weatherData);
}).catch(function(err) {
  console.warn('Something went wrong.' , err);
});