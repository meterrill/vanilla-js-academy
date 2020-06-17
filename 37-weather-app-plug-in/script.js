function getWeather(options) {
  // Default settings
  var defaults = {
    apiKey: null, // Required
    selector: '#app',
    units: 'f', // 'c' for Celcius or 'f' for Fahrenheit
    message: 'Current weather in {{location}} is {{temperature}} and {{conditions}}.',
    noWeather: 'Sorry, unable to get weather data at this time.',
    showIcon: true
  };

  // Merge user options into defaults
  var settings = Object.assign(defaults, options);

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
    
  // Get temperature in Celcius or Fahrenheit
  function getTemp(temp) {
    return (settings.units === 'c') ? (Math.round(temp) + `&#8451`) : (Math.round((temp * 9 / 5) + 32) + `&#8457`);
  }

  // Render message to DOM
  function renderMessage(weather) {
    var location = `${sanitizeHTML(weather.city_name)}, ${sanitizeHTML(weather.state_code)}`;
    var temperature = getTemp(sanitizeHTML(weather.temp));
    var conditions = sanitizeHTML(weather.weather.description).toLowerCase();

    app.innerHTML = `
      <p>${settings.message
        .replace('{{location}}', location)
        .replace('{{temperature}}', temperature)
        .replace('{{conditions}}', conditions)
      }</p>
    `;  
  }
  
  // Render icon to DOM
  function renderIcon(weather) {
    if (settings.showIcon) {
      app.innerHTML = `
        <p>
          <img src="https://www.weatherbit.io/static/img/icons/${sanitizeHTML(weather.weather.icon)}.png" alt="${sanitizeHTML(weather.weather.description)}">
        </p>
      ` + app.innerHTML;
    }
  }

  // Render current weather to DOM
  function renderWeather(weather) {
    renderMessage(weather);
    renderIcon(weather);
  } 
  
  // Render message to DOM if no weather data is available
  function renderNoWeather() {
    app.innerHTML = settings.noWeather;
  }

  // Check for API key
  if(!settings.apiKey) {
    console.error('Please provide an API key.');
    return;
  }
   
  // Get user's location
  fetch('https://ipapi.co/json/').then(function(response) {
    return response.ok ? response.json() : Promise.reject(response);
  }).then(function(locationData) {
    // Get the current weather
    return fetch(`https://api.weatherbit.io/v2.0/current?city=${locationData.city},${locationData.region_code}&key=${settings.apiKey}`);
  }).then(function(response) {
    return response.ok ? response.json() : Promise.reject(response);
  }).then(function(weatherData) {
    // Pass the weather data to renderWeather helper function
    renderWeather(weatherData.data[0]);
  }).catch(function() {
    // Render error message to DOM
    renderNoWeather();
  });
}

getWeather({
  apiKey: '418c15fc4a2b4812936ccb24faa2532d',
  // units: 'c',
  // message: 'It\'s currently {{temperature}} and {{conditions}} in {{location}}.',
  // noWeather: 'Unable to get weather data at this time.',
  // showIcon: false
});
