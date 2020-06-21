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
  Constructor.prototype.toArray = function() {
    return Array.prototype.slice.call(this.elements);
  };

  /**
   * Get the first matching element
   * @return  {Object}  An element
   */
  Constructor.prototype.getFirst = function() {
    return this.elements[0];
  }

  /**
   * Get the last matching element
   * @return  {Object}  An element
   */
  Constructor.prototype.getLast = function() {
    return this.elements[this.elements.length - 1];
  }

  /**
   * Add a class to all matching elements
   * @param  {String}  className The class to add
   */
  Constructor.prototype.addClass = function(className) {
    this.toArray().forEach(function(element) {
      element.classList.add(className);
    });
  }

  /**
   * Remove a class from all matching elements
   * @param  {String}  className The class to remove
   */
  Constructor.prototype.removeClass = function(className) {
    this.toArray().forEach(function(element) {
      element.classList.remove(className);
    });
  }

  /**
   * Return the contructor object
   */
  return Constructor;

})();

// Create new instances
var btns = new $('button');
var list = new $('ul');

// $.toArray()
console.log('$.toArray()', btns.toArray());
console.log('$.toArray()', list.toArray());

// $.getFirst()
console.log('$.getFirst()', btns.getFirst());

// $.getLast()
console.log('$.getLast()', btns.getLast());

// $.addClass()
btns.addClass('btn-purple');

// $.removeClass()
btns.removeClass('btn-blue');
