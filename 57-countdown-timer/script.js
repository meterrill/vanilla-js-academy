/**
 * State-based UI Component
 * @param {String} selector The selector for the target element
 * @param {Object} options  The component options
 */
function Timer(selector, options) {
  this.element = document.querySelector(selector);
  this.data = options.data;
  this.template = options.template;
};

/**
 * Render a new UI
 */
Timer.prototype.render = function() {
  this.element.innerHTML = this.template(this.data);
}

// Instantiate a new Timer component
var app = new Timer('#app', {
  data: {count: 60},
  template: function(props) {
    return `<h2>${props.count}</h2>`;
  }
});

// Run the render function and decrement every second
var countDown = setInterval(function() {

  // Render the Timer
  app.render();
  
  // Decrement the count by 1
  app.data.count--;
  
  // Clear the interval when count equals 0
  if (app.data.count < 0) {
    clearInterval(countDown);
  }
  
}, 1000);
