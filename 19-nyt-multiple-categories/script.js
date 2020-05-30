// Get the #app element
var app = document.querySelector('#app');

// Store the sections, endpoint, and API key
var sections = ['arts', 'automobiles', 'books', 'business', 'fashion', 'food', 'health', 'home', 'insider', 'magazine', 'movies', 'nyregion', 'obituaries', 'opinion', 'politics', 'realestate', 'science', 'sports', 'sundayreview', 'technology', 'theater', 't - magazine', 'travel', 'upshot', 'us', 'world']
var endpoint = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=';
var apiKey = '0q2Pwnu4SiIy7UxplCJ745E0PGRohgVb';

// Fetch the stories from the API
function getStories(section) {
  fetch(endpoint + apiKey).then(function (response) {
    return response.ok ? response.json() : Promise.reject(response);
  }).then(function (data) {
    app.innerHTML += '<section>' + 
      '<h2>' + section + '</h2>' + 
      '<div>' + 
      data.results.slice(0, 3).map(function (story) {
        return (
          '<article>' +
          '<a href="' + story.url + '">' +
          '<img src="' + story.multimedia[0].url + '" alt="' + story.multimedia[0].caption + '">' +
          '<h3>' + story.title + '</h3>' +
          '<p>' + story.abstract + '</p>' +
          '<time datetime="' + story.published_date + '">' + new Date(story.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) + '</time>' +
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
  getStories(section);
});
