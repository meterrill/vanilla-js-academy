var duration = 120;
var timer;

/**
 * Create a handler object for new Proxy objects
 * @param   {Object} instance The current instance of Timer
 * @returns {Object}          The handler object
 */
function handler(instance) {
  return {
    get: function (obj, prop) {
      if (['[object Object]', '[object Array]'].indexOf(Object.prototype.toString.call(obj[prop])) > -1) {
        return new Proxy(obj[prop], handler(instance));
      }
      return obj[prop];
    },
    set: function (obj, prop, value) {
      obj[prop] = value;
      instance.render();
      return true;
    },
    deleteProperty: function (obj, prop) {
      delete obj[prop];
      instance.render();
      return true;
    }
  };
};

/**
 * State-based UI Component
 * @param {String} selector The selector for the target element
 * @param {Object} options  The component options
 */
function Timer(selector, options) {
  this.element = document.querySelector(selector);
  var _data = new Proxy(options.data, handler(this));
  this.template = options.template;

  // Define getter and setter for data
  Object.defineProperty(this, 'data', {
    get: function() {
      return _data;
    },
    set: function(data) {
      _data = new Proxy(data, handler(this));
      this.render();
      return true;
    }
  });
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
 * @returns {String} string The time in M:SS format
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
  data: {
    time: duration,
    paused: true
  },
  template: function(props) {
    // Display the current time and buttons
    return `
      <p class="time">${formatTime(props.time)}</p>
      <p>
        <button data-pause ${props.time < 1 ? 'disabled' : ''}>${props.paused ? 'Start' : 'Pause'}</button>
        <button data-reset>Reset</button>
      </p>
    `;
  }
});

/**
 * Countdown the Timer
 */
function countdown() {
  // Decrement the time by 1
  app.data.time--;

  // Clear the interval when time equals 0
  if (app.data.time < 1) {
    stopTimer();
  }
}

/**
 * Stop the Timer
 */
function stopTimer() {
  // Clear the interval
  clearInterval(timer);
}

/**
 * Start the Timer
 */
function startTimer() {
  // Start the Timer
  timer = setInterval(countdown, 1000);
}

window.addEventListener('click', function(event) {
  if (event.target.matches('[data-reset]')) {
    // Reset the app data
    app.data.time = duration;
    app.data.paused = true;

    // Stop the Timer
    stopTimer();
  }

  if (event.target.matches('[data-pause]')) {
    // Toggle paused boolean
    app.data.paused = app.data.paused ? false : true;

    // Stop/start the Timer
    if (app.data.paused) {
      stopTimer();
    } else {
      startTimer();
    }
  }
});

// Render the initial UI
app.render();
