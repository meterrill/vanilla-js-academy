var duration = 10;
var timer;

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
 * Format the time
 * @param   {Number} number The time in seconds
 * @return  {String} string The time in M:SS format
 */
function formatTime(number) {
  var minutes = Math.floor(number / 60);
  var seconds = (number % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

/**
 * Instantiate a new Timer component
 * @param {Object}  props The component options
 */
var app = new Timer('#app', {
  data: {time: duration},
  template: function(props) {
    // Display the current time and buttons
    return `
      <p class="time">${formatTime(props.time)}</p>
      <p><button data-restart>Restart</button></p>`;
  }
});

/**
 * Countdown the Timer
 */
function countdown() {
  // Decrement the time by 1
  app.data.time--;

  // Check if the Timer should be stopped
  stopTimer();
  
  // Update the UI
  app.render();  
}

function stopTimer() {
  // Clear the interval when time equals 0
  if (app.data.time < 1) {
    clearInterval(timer);
  }
}

/**
 * Start the Timer
 */
function startTimer() {
  // Reset the app data
  app.data.time = duration;

  // Render the Timer
  app.render();

  // Start the Timer
  timer = setInterval(countdown, 1000);
}

window.addEventListener('click', function() {
  if (event.target.matches('[data-restart]')) {
    clearInterval(timer);
    startTimer();
  }
});

startTimer();
