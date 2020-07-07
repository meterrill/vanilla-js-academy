var duration = 60;

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

/**
 * Instantiate a new Timer component
 * @param {Object}  props The component options
 */
var app = new Timer('#app', {
  data: {time: duration},
  template: function(props) {
    // Display a restart button when time equals 0
    if (props.time < 1) {
      return `<p><button data-restart>Restart</button></p>`;
    }

    // Display the current time
    return `<p>${props.time}</p>`;
  }
});

/**
 * Start the Timer
 */
function startTimer() {
  // Reset the app data
  app.data.time = duration;

  // Render the Timer
  app.render();

  // Run the render function and decrement every second
  var countdown = setInterval(function() {
    // Decrement the time by 1
    app.data.time--;
  
    // Clear the interval when time equals 0
    if (app.data.time < 0) {
      clearInterval(countdown);
    }

    // Update the UI
    app.render();
  }, 1000);
}

window.addEventListener('click', function() {
  if (event.target.matches('[data-restart]')) {
    startTimer();
  }
});

startTimer();
