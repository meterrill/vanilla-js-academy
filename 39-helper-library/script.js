var _ = (function() {

  // Public methods
  var methods = {};

  /**
   * Convert an array-like object into an array
   * @param  {*}     list An array-like object (e.g., NodeList)
   * @return {Array}      An array
   */
  methods.toArray = function(list) {
    return Array.prototype.slice.call(list);
  };

  /**
   * Get the first element that matches a selector
   * @param  {String} selector The selector
   * @return {Node}            The matching element
   */
  methods.getFirst = function(selector) {
    return document.querySelector(selector);
  };

  /**
   * Get all elements that match a selector
   * @param  {String} selector The selector
   * @return {Array}           The matching elements
   */
  methods.getAll = function(selector) {
    return this.toArray(document.querySelectorAll(selector));
  };

  /**
   * Add a class to all elements in an array
   * @param {Array}  array     The elements
   * @param {String} className The class to add
   */
  methods.addClass = function(array, className) {
    array.forEach(function(element) {
      element.classList.add(className);
    });
  };

  /**
   * Remove a class from all elements in an array
   * @param {Array}  array     The elements
   * @param {String} className The class to remove
   */
  methods.removeClass = function(array, className) {
    array.forEach(function(element) {
      element.classList.remove(className);
    });
  };

  // Return public methods
  return methods;

})();

// _.toArray()
var arr = _.toArray(document.querySelectorAll('button'));
console.log('_.toArray()', arr);

// _.getFirst()
var btn = _.getFirst('button');
console.log('_.getFirst()', btn);

// _.getAll()
var btns = _.getAll('button');
console.log('_.getAll()', btns);

// _.addClass()
_.addClass(btns, 'btn-purple');

// _.removeClass()
_.removeClass(btns, 'btn-blue');