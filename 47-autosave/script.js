;(function() {

  'use strict';

  var storagePrefix = 'form-autosave_';

  // Get #save-me form and form fields
  var form = document.querySelector('#save-me');
  var formFields = Array.prototype.slice.call(document.querySelectorAll('input, textarea'));

  /**
   * Get the input values from local storage
   */
  function getValue() {
    formFields.forEach(function(field) {
      field.value = localStorage.getItem(storagePrefix + field.id);
    });
  }

  /**
   * Save the input value to local storage
   * @param {Object} event The event object
   */
  function setValue(event) {
    // Only run if event.target is inside the #save-me form
    if (!event.target.closest('#save-me')) return;

    localStorage.setItem(storagePrefix + event.target.id, event.target.value);
  }

  /**
   * Remove input values from local storage
   * @param {*} event 
   */
  function removeValue(event) {
    event.preventDefault();

    formFields.forEach(function(field) {
      localStorage.removeItem(storagePrefix + field.id);
      field.value = '';
    });
  }

  // Get the input values when the page loads
  getValue();

  // Listen for changes to form inputs
  form.addEventListener('input', setValue);

  // Listen for form submit
  form.addEventListener('submit', removeValue);

})();