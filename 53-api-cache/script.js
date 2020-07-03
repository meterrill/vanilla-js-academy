;(function() {

  'use strict';

  // Get the #app element
  var app = document.querySelector('#app');

  // Get saved data from localStorage
  var saved = localStorage.getItem('scuttlebuttData');

  // Store the endpoint
  var endpoint = 'https://vanillajsacademy.com/api/pirates.json';

  /**
   * Display the data in the DOM
   * @param {Object} data 
   */
  function displayData(data) {
    app.innerHTML = data.articles.map(function(article) {
      return `<article>
        <h2>${article.title}</h2>
        <p>${article.article}</p>
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
      localStorage.setItem('scuttlebuttData', JSON.stringify(data));
    }).catch(function(error) {
      app.innerHTML = '<p>We\'re experiencing some technical difficulties. Please try again later.</p>';
    });
  }

  if (!saved) {
    getDataFromAPI();
  }  

})();