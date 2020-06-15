// Get #app element
var app = document.querySelector('#app');

// Get user's location
fetch('https://ipapi.co/json/').then(function(response) {
  return response.ok ? response.json() : Promise.reject(response);
}).then(function(data) {
  console.log(data);
}).catch(function(err) {
  console.warn('Something went wrong.' , err);
});