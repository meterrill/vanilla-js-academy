;(function () {
	// Get the  #table-of-contents element
	var tableOfContents = document.querySelector('#table-of-contents');
	
	// Get the h2 elements
	var headings = document.querySelectorAll('h2');
	
	// Create ID from heading text
	function createID(heading) {
		heading.id = heading.textContent.replace(/\W+/g, '-').toLowerCase();
	}
	
	// Create a list item/link from heading
	function createLink(heading) {
		return `<li>
			<a href="#${heading.id}">${heading.innerText}</a>
		</li>`;
	}
	
	// Only generate markup if h2 elements exist
	if (headings.length > 0) {
		// Create a list of anchor links and render to the DOM
		tableOfContents.innerHTML = `<ul>
			${Array.prototype.slice.call(headings).map(function(heading) {
				// Check for missing IDs
				if (!heading.id) {
					createID(heading);
				}
	
				return createLink(heading);
			}).join('')}
		</ul>`;
	}
})();
