;(function() {

  'use strict';

  // Get #save-me form
  var form = document.querySelector('#save-me');

  /**
   * Save the input value to local storage
   * @param {*} event 
   */
  function setValue(event) {
    if (event.target.matches('#name')) {
      localStorage.setItem('name', event.target.value);
    }
  }

  // Listen for changes to form inputs
  form.addEventListener('input', setValue);

})();