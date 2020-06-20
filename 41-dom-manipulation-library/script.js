var $ = (function() {

  /**
   * Create the constructor object
   * @param {String} selector A selector
   */
  var Constructor = function(selector) {
    this.elements = document.querySelectorAll(selector);
  };

  /**
   * Return the contructor object
   */
  return Constructor;

})();
