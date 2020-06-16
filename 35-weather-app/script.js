// Store weather API key
var apiKey = '418c15fc4a2b4812936ccb24faa2532d';

// Get #app element
var app = document.querySelector('#app');

// Convert temp from Celcius to Farenheit
function tempInFarenheit(temp) {
	return parseInt((temp * 9 / 5) + 32);
}

// Render current weather to DOM
function renderWeather(weather) {
	app.innerHTML = `
		<p>
			<img src="https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png" alt="${weather.weather.description}">
		</p>
    <p>Current weather in ${weather.city_name}, ${weather.state_code} is ${tempInFarenheit(weather.temp)}&#176 and ${(weather.weather.description).toLowerCase()}.</p>
  `;  
}

// Get user's location
fetch('https://ipapi.co/json/').then(function(response) {
  return response.ok ? response.json() : Promise.reject(response);
}).then(function(locationData) {
  // Get the current weather
  return fetch(`https://api.weatherbit.io/v2.0/current?city=${locationData.city},${locationData.region_code}&key=${apiKey}`);
}).then(function(response) {
  return response.ok ? response.json() : Promise.reject(response);
}).then(function(weatherData) {
  // Pass the weather data to renderWeather helper function
  renderWeather(weatherData.data[0]);
}).catch(function(error) {
  // Render error message to DOM
  app.textContent = 'Unable to get weather data at this time.';
  console.warn(error);
});