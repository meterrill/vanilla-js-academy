var sidkik = (function() {

  // Public methods
  var methods = {};

  // Convert a NodeList to an Array
  methods.convertToArray = function(nodeList) {
    return Array.prototype.slice.call(nodeList);
  };

  // Return public methods
  return methods;

})();