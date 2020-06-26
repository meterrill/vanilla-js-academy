;(function() {

  'use strict';

  // Get #save-me form
  var form = document.querySelector('#save-me');
  var name = document.querySelector('#name');

  /**
   * Get the input values from local storage
   */
  function getValue() {
    name.value = localStorage.getItem('name');
  }

  /**
   * Save the input value to local storage
   * @param {*} event 
   */
  function setValue(event) {
    localStorage.setItem(event.target.id, event.target.value);
  }

  /**
   * Remove items from local storage
   * @param {*} event 
   */
  function removeValue(event) {
    event.preventDefault();

    localStorage.removeItem('name');
  }

  // Get the input values when the page loads
  getValue();

  // Listen for changes to form inputs
  form.addEventListener('input', setValue);

  // Listen for form submit
  form.addEventListener('submit', removeValue);

})();