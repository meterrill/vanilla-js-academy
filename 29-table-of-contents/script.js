// Get the  #table-of-contents element
var toc = document.querySelector('#table-of-contents');

// Get an array of all the h2 elements
var headings = Array.prototype.slice.call(document.querySelectorAll('h2'));

// Only generate markup if h2 elements exist
if (headings.length > 0) {
  // Create a list of anchor links and render to the DOM
  toc.innerHTML = `<ul>
                  ${headings.map(function(heading) {
                    return `<li>
                      <a href="#${heading.id}">${heading.innerText}</a>
                    </li>`
                    }).join('')}
                  </ul>`;
}
