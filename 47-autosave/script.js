;(function() {

  'use strict';

  // Get #save-me form
  var form = document.querySelector('#save-me');

  // Log the updated value
  function updateValue(event) {
    if (event.target.matches('#name')) {
      console.log(event.target.value);
    }
  }

  // Listen for changes to form inputs
  form.addEventListener('input', updateValue);

})();