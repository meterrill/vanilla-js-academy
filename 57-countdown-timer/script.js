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

function startTimer() {
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
    if (app.data.count < -1) {
      clearInterval(countDown);
  
      // Display a restart button
      app.data.count = `<button data-restart>Restart</button`;
      app.render();
    }
    
  }, 1000);
}

window.addEventListener('click', function() {
  if (event.target.matches('[data-restart]')) {
    startTimer();
  }
});

startTimer();
