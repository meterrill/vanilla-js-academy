var sidkik = (function() {

  // Public methods
  var methods = {};

  // Convert a NodeList to an Array
  methods.convertToArray = function(nodeList) {
    return Array.prototype.slice.call(nodeList);
  };

  // Get the first matching element in the DOM
  methods.getFirst = function(selector) {
    return document.querySelector(selector);
  };

  // Get all matching elements in the DOM as an array
  methods.getAll = function(selector) {
    return this.convertToArray(document.querySelectorAll(selector));
  };

  // Return public methods
  return methods;

})();