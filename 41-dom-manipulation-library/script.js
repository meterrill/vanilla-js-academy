var $ = (function() {

  /**
   * Create the constructor object
   * @param {String} selector A selector
   */
  var Constructor = function(selector) {
    this.elements = document.querySelectorAll(selector);
  };

  /**
   * Get an array of elements
   * @return  {Array} An array
   */
  Constructor.prototype.getArray = function() {
    return Array.prototype.slice.call(this.elements);
  };

  /**
   * Return the contructor object
   */
  return Constructor;

})();
