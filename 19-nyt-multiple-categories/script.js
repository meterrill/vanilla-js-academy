// Get the #app element
var app = document.querySelector('#app');

// Store the endpoint and API key
var endpoint = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=';
var apiKey = '0q2Pwnu4SiIy7UxplCJ745E0PGRohgVb';

// Get the JSON from the API
function getJSON(response) {
  return response.ok ? response.json() : Promise.reject(response);
}

// Add the stories to the DOM
function showStories(stories) {
  app.innerHTML = stories.results.map(function (story) {
    return (
      '<article>' +
      // '<h2>' + story.section + '</h2>' +
      '<a href="' + story.url + '">' +
      '<img src="' + story.multimedia[0].url + '" alt="' + story.multimedia[0].caption + '">' +
      '<h3>' + story.title + '</h3>' +
      '<p>' + story.abstract + '</p>' +
      '<time datetime="' + story.published_date + '">' + new Date(story.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) + '</time>' +
      '</a>' +
      '</article>'
    );
  }).join('');
}

// Add an error message to the DOM
function showError(error) {
  app.innerHTML = '<p>We\'re experiencing some technical difficulties. Please try again later or view today\'s top stories directly on <a href="https://www.nytimes.com/">The New York Times</a> website.</p>';
}

// Fetch the stories from the API and add them to the DOM
fetch(endpoint + apiKey)
  .then(getJSON)
  .then(showStories)
  .catch(showError);
