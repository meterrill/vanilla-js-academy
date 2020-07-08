var hourglassIcon = document.querySelector('[data-icon="hourglass"]');

/**
 * Animate hourglass icon
 */
var animateHourglass = function() {
  hourglassIcon.innerHTML = "&#xf251;";
  setTimeout(function() {
    hourglassIcon.innerHTML = "&#xf252;";
  }, 1000);
  setTimeout(function() {
    hourglassIcon.innerHTML = "&#xf253;";
  }, 2000);
}

// Run the animation
animateHourglass();
