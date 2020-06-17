function getWeather() {
  // Store weather API key
  var apiKey = '418c15fc4a2b4812936ccb24faa2532d';
  
  // Get #app element
  var app = document.querySelector('#app');
  
  /*!
   * Sanitize and encode all HTML in a user-submitted string
   * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
   * @param  {String} str  The user-submitted string
   * @return {String} str  The sanitized string
   */
  var sanitizeHTML = function (str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  };
  
  // Convert temp from Celcius to Farenheit
  function tempInFarenheit(temp) {
    return parseInt((temp * 9 / 5) + 32);
  }
  
  // Render current weather to DOM
  function renderWeather(weather) {
    app.innerHTML = `
      <p>
        <img src="https://www.weatherbit.io/static/img/icons/${sanitizeHTML(weather.weather.icon)}.png" alt="${sanitizeHTML(weather.weather.description)}">
      </p>
      <p>Current weather in ${sanitizeHTML(weather.city_name)}, ${sanitizeHTML(weather.state_code)} is ${tempInFarenheit(sanitizeHTML(weather.temp))}&#176 and ${sanitizeHTML(weather.weather.description).toLowerCase()}.</p>
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
}

getWeather();