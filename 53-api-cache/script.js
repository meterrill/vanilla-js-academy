;(function() {

  'use strict';

  // Get the #app element
  var app = document.querySelector('#app');
  
  // Store the endpoint
  var endpoint = 'https://vanillajsacademy.com/api/pirates.json';

  // Save the localStorage key
  var storageID = 'scuttlebuttData';

  // Get saved data from localStorage
  var saved = localStorage.getItem(storageID);

  /**
   * Check if saved data is still valid
   * @param   {Object}  saved   Saved data
   * @param   {Number}  goodFor Amount of time in milliseconds that the data is good for
   * @return  {Boolean}         If true, data is still valid
   */
  var isDataValid = function (saved, goodFor) {

    // Check that there's data, and a timestamp key
    if (!saved || !saved.data || !saved.timestamp) return false;
  
    // Get the difference between the timestamp and current time
    var difference = new Date().getTime() - saved.timestamp;
  
    return difference < goodFor;
  
  };

  /**
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

  /**
   * Display the data in the DOM
   * @param {Object} data 
   */
  function displayData(data) {
    app.innerHTML = data.articles.map(function(article) {
      return `<article>
        <h2>${sanitizeHTML(article.title)}</h2>
        <p>${sanitizeHTML(article.article)}</p>
      </article>`
    }).join('');
  }

  /**
   * Get the data from the API
   */
  function getDataFromAPI() {
    fetch(endpoint).then(function(response) {
      return response.ok ? response.json() : Promise.reject(response);
    }).then(function(data) {
      // Display the response data
      console.log('Data from API');
      displayData(data);

      // Return the response data
      return data;
    }).then(function(data) {
      // Set up the localStorage data
      var data = {
        data: data,
        timestamp: new Date().getTime()
      };
  
      // Save the data to localStorage
      localStorage.setItem(storageID, JSON.stringify(data));
    }).catch(function(error) {
      app.innerHTML = '<p>We\'re experiencing some technical difficulties. Please try again later.</p>';
    });
  }

  if (saved) {
    // Parse saved data
    saved = JSON.parse(saved);
    // Check if it's been less than 5 seconds since the data was saved
    if (isDataValid(saved, 1000 * 5)) {
      // The data is still good, use it
      console.log('Data from Storage');
      displayData(saved.data);
    } else {
      // Get fresh data and use that instead
      getDataFromAPI();
    }
  } else {
    getDataFromAPI();
  }

})();