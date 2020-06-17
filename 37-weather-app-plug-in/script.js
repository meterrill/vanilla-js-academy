function getWeather(options) {
  // Default settings
  var defaults = {
    selector: '#app',
    units: 'f',
    message: 'Current weather in {location} is {temperature} and {conditions}.',
    icon: true
  };

  // Merge user options into defaults
  var settings = Object.assign(defaults, options);

  // Store weather API key
  var apiKey = '418c15fc4a2b4812936ccb24faa2532d';
  
  // Get #app element
  var app = document.querySelector(settings.selector);
  
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
    
  // Get temperature in celcius or fahrenheit
  function getTemp(units, temp) {
    return parseInt((units === 'c') ? temp : ((temp * 9 / 5) + 32)).toString() + `&#176`;
  }

  // Render message to DOM
  function renderMessage(message, weather) {
    var location = `${sanitizeHTML(weather.city_name)}, ${sanitizeHTML(weather.state_code)}`;
    var temperature = getTemp(settings.units, sanitizeHTML(weather.temp));
    var conditions = `${sanitizeHTML(weather.weather.description).toLowerCase()}`;

    app.innerHTML = `
      <p>${message
        .replace('{location}', location)
        .replace('{temperature}', temperature)
        .replace('{conditions}', conditions)
      }</p>
    `;  
  }
  
  // Render icon to DOM
  function renderIcon(icon, weather) {
    if (icon) {
      app.innerHTML = `
        <p>
          <img src="https://www.weatherbit.io/static/img/icons/${sanitizeHTML(weather.weather.icon)}.png" alt="${sanitizeHTML(weather.weather.description)}">
        </p>
      ` + app.innerHTML;
    }
  }

  // Render current weather to DOM
  function renderWeather(weather) {
    renderMessage(settings.message, weather);
    renderIcon(settings.icon, weather);
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

// getWeather();

getWeather({
  units: 'c',
  message: 'It\'s currently {temperature} and {conditions} in {location}.',
  icon: false
});
