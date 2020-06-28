;(function() {

  'use strict';

  var formValues = {};

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
    // Only run if formValues exists in localStorage
    if (!localStorage.getItem('formValues')) return;

    // Get the formValues object from localStorage
    formValues = JSON.parse(localStorage.getItem('formValues'));

    formFields.forEach(function(field) {
      // Get an ID for the field
      var id = getID(field);
      if (!id) return;

      // Only run if id exists in the formValues object
      if (!formValues[id]) return;

      // Get the value from the formValues object
      field.value = formValues[id];
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

    // Add field to formValues object
    formValues[id] = event.target.value;

    // Save the formValues object to localStorage
    localStorage.setItem('formValues', JSON.stringify(formValues));
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

      // Reset the field value
      field.value = '';
    });

    // Remove the formValues object from localStorage
    localStorage.removeItem('formValues');
  }

  // Get the input values when the page loads
  getValue();

  // Listen for changes to form inputs
  form.addEventListener('input', setValue);

  // Listen for form submit
  form.addEventListener('submit', removeValue);

})();