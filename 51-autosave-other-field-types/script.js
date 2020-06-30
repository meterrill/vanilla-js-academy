;(function() {

  'use strict';

  // Save the localStorage key
  var storageID = 'form-autosave';

  // Get the #save-me form
  var form = document.querySelector('#save-me');
  
  // Get the form fields
  var formFields = Array.prototype.slice.call(document.querySelectorAll('input, textarea, select'));

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
    // Get the formValues object from localStorage
    var formValues = localStorage.getItem(storageID);
    if (!formValues) return;
    formValues = JSON.parse(formValues);

    formFields.forEach(function(field) {
      // Get an ID for the field
      var id = getID(field);
      if (!id) return;

      // Only run if id exists in the formValues object
      if (!formValues[id]) return;

      // Get the value from the formValues object
      if (field.type === 'radio') {
        if (field.value === formValues[id]) {
          field.checked = true;
        }
      } else if (field.type === 'checkbox') {
        var checkbox = form.querySelector(`input[name="${id}"]`);
        if (formValues[id] === true) {
          checkbox.checked = true;
        }
      } else {
        field.value = formValues[id];
      }
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

    // Get the formValues object from localStorage
    var formValues = localStorage.getItem(storageID);
    formValues = formValues ? JSON.parse(formValues) : {};

    // Add field to formValues object
    if (event.target.type === 'radio') {
      var radioButtons = form.querySelectorAll(`input[name="${id}"]`);
      for (const radioButton of radioButtons) {
        if (radioButton.checked) {
          formValues[id] = radioButton.value;
        }
      }
    } else if (event.target.type === 'checkbox') {
      formValues[id] = event.target.checked;
    } else {
      formValues[id] = event.target.value;
    }

    // Save the formValues object to localStorage
    localStorage.setItem(storageID, JSON.stringify(formValues));
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
      if (field.type === 'radio') {
        var radioButtons = form.querySelectorAll(`input[name="${id}"]`);
        for (const radioButton of radioButtons) {
          radioButton.checked = false;
        }
      } else if (field.type === 'checkbox') {
        field.checked = false;
      } else {
        field.value = '';
      }
    });

    // Remove the formValues object from localStorage
    localStorage.removeItem(storageID);
  }

  // Get the input values when the page loads
  getValue();

  // Listen for changes to form inputs
  form.addEventListener('input', setValue);

  // Listen for form submit
  form.addEventListener('submit', removeValue);

})();