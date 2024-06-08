document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const authorInput = document.getElementById('author-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');

    const fetchRandomQuote = async () => {
        try {
            const response = await fetch('https://zenquotes.io/api/random');
            const data = await response.json();
            const quote = data[0];
            quoteText.innerText = `"${quote.q}"`;
            quoteAuthor.innerText = `- ${quote.a}`;
        } catch (error) {
            console.error('Error fetching quote:', error);
        }
    };

    const searchByAuthor = async () => {
        const author = authorInput.value;
        if (!author) return;

        try {
            const response = await fetch(`https://zenquotes.io/api/quotes/${author}`);
            const data = await response.json();
            searchResults.innerHTML = '';
            data.forEach(quote => {
                const p = document.createElement('p');
                p.innerText = `"${quote.q}" - ${quote.a}`;
                searchResults.appendChild(p);
            });
        } catch (error) {
            console.error('Error fetching quotes:', error);
        }
    };

    searchButton.addEventListener('click', searchByAuthor);
    fetchRandomQuote();
});
