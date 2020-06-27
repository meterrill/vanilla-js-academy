;(function() {

  'use strict';

  var storagePrefix = 'form-autosave_';

  // Get #save-me form and form fields
  var form = document.querySelector('#save-me');
  var formFields = Array.prototype.slice.call(document.querySelectorAll('input, textarea'));

  /**
   * Get an ID for a field
   * @param  {Node}   field The field
   * @return {String}       The ID
   */
  function getID(field) {
    if (field.id.length > 0) {
      return field.id;
    }

    if (field.name.length > 0) {
      return field.name;
    }

    return null;
  }

  /**
   * Get the input values from local storage
   */
  function getValue() {
    formFields.forEach(function(field) {
      // Get an ID for the field
      var id = getID(field);
      if (!id) return;

      // Get the value from localStorage
      field.value = localStorage.getItem(storagePrefix + id);
    });
  }

  /**
   * Save the input value to local storage
   * @param {Object} event The event object
   */
  function setValue(event) {
    // Only run if event.target is inside the #save-me form
    if (!event.target.closest('#save-me')) return;

    // Get an ID for the field
    var id = getID(event.target);
    if (!id) return;

    // Save the field to localStorage
    localStorage.setItem(storagePrefix + id, event.target.value);
  }

  /**
   * Remove input values from local storage
   * @param {Event} event The event object
   */
  function removeValue(event) {
    event.preventDefault();

    formFields.forEach(function(field) {
      // Get an ID for the field
      var id = getID(field);
      if (!id) return;

      // Remove the field from localStorage
      localStorage.removeItem(storagePrefix + id);

      // Reset the field value
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