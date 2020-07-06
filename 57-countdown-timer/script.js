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
  data: 60,
  template: function(props) {
    var html = `<h2>${props}</h2>`;
    return html;
  }
});

// Render the Timer
app.render();