// Get the #app element
var app = document.querySelector('#app');

// Store the sections, endpoint, and API key
var sections = ['world', 'us', 'sports', 'technology']
var endpoint = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=';
var apiKey = '0q2Pwnu4SiIy7UxplCJ745E0PGRohgVb';

/*!
 * Sanitize and encode all HTML in a user-submitted string
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
var sanitizeHTML = function (str) {
  var temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
};

// Fetch the stories from the API
function getStories(section, endpoint) {
  fetch(endpoint).then(function (response) {
    return response.ok ? response.json() : Promise.reject(response);
  }).then(function (data) {
    app.innerHTML += '<section>' +
      '<h2>' +
      '<a href="https://www.nytimes.com/section/' + section + '">' + section + '</a>' +
      '</h2>' +
      '<div>' +
      data.results.slice(0, 3).map(function (story) {
        return (
          '<article>' +
          '<a href="' + sanitizeHTML(story.url) + '">' +
          '<img src="' + sanitizeHTML(story.multimedia[0].url) + '" alt="' + sanitizeHTML(story.multimedia[0].caption) + '">' +
          '<h3>' + sanitizeHTML(story.title) + '</h3>' +
          '<p>' + sanitizeHTML(story.abstract) + '</p>' +
          '<time datetime="' + sanitizeHTML(story.published_date) + '">' + new Date(sanitizeHTML(story.published_date)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) + '</time>' +
          '</a>' +
          '</article>'
        );
      }).join('') +
      '</div>' +
      '</section>';
  }).catch(function (error) {
    app.innerHTML = '<p>We\'re experiencing some technical difficulties. Please try again later or view today\'s top stories directly on <a href="https://www.nytimes.com/">The New York Times</a> website.</p>';
  });
}

// Get stories for each section
sections.forEach(function (section) {
  endpoint = 'https://api.nytimes.com/svc/topstories/v2/' + section + '.json?api-key=' + apiKey;

  getStories(section, endpoint);
});
