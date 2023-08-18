

async function getpapers() {
  try {
      const response = await fetch('https://serpapi.com/search.json?engine=google_scholar&q=author:armin%20nabizadeh&api_key=56e6ee3f4a7f850c0076ad10c14bdcc31e0371c82ecd04e7a5630e377a9a5754');
      const data = await response.json();

      const resultsDiv = document.getElementById('results');

      for (const result of data.organic_results) {
          const title = result.title;
          const authors = result.publication_info.authors.map(author => author.name).join(', ');
          const citations = result.inline_links.cited_by.total;

          const resultHTML = `
              <div>
                  <h2>${title}</h2>
                  <p>Authors: ${authors}</p>
                  <p>Citations: ${citations}</p>
                  <hr>
              </div>
          `;

          resultsDiv.innerHTML += resultHTML;
      }
  } catch (error) {
      console.error("Error fetching the data:", error);
  }
}

const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("56e6ee3f4a7f850c0076ad10c14bdcc31e0371c82ecd04e7a5630e377a9a5754");

const params = {
  engine: "google_scholar",
  q: "author:armin nabizadeh"
};

const callback = function(data) {
  console.log(data["organic_results"]);
};

// Show result as JSON
search.json(params, callback);
