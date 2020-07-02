;(function() {

  'use strict';

  // Get the #app element
  var app = document.querySelector('#app');

  // Get saved data from localStorage
  var saved = localStorage.getItem('scuttlebuttData');

  // Store the endpoint
  var endpoint = 'https://vanillajsacademy.com/api/pirates.json';

  /**
   * Get the data from the API
   */
  function getDataFromAPI() {
    fetch(endpoint).then(function(response) {
      return response.ok ? response.json() : Promise.reject(response);
    }).then(function(data) {
      console.log(data);
    }).catch(function(error) {
      app.innerHTML = '<p>We\'re experiencing some technical difficulties. Please try again later.</p>';
    });
  }

  if (!saved) {
    getDataFromAPI();
  }  

})();