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
  // Store the weather data
  var weather = weatherData.data[0];
  // Convert temp from Celcius to Farenheit
  var tempInFarenheit = (weather.temp * 9 / 5) + 32;
  // Render current weather to DOM
  app.innerHTML = `
    <h3>Current weather in ${weather.city_name}, ${weather.state_code}</h3>
    <h2>${tempInFarenheit} (&#8457) / ${weather.temp} (&#8451)</h2>
  `;
}).catch(function(err) {
  console.warn('Something went wrong.' , err);
});