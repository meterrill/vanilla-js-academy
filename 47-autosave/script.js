;(function() {

  'use strict';

  // Get #save-me form and form fields
  var form = document.querySelector('#save-me');
  var formFields = Array.prototype.slice.call(document.querySelectorAll('input, textarea'));

  /**
   * Get the input values from local storage
   */
  function getValue() {
    formFields.forEach(function(field) {
      field.value = localStorage.getItem(field.id);
    });
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