async function getpapers() {
  try {
      const response = await fetch('https://ui.adsabs.harvard.edu/search/q=%20%20author%3A%22%5Eleroy%2Ca%22&sort=date%20desc%2C%20bibcode%20desc&p_=0');
      log.console(response);
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

getpapers();
