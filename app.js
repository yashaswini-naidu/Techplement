document.addEventListener('DOMContentLoaded', () => {
    fetchRandomQuote();
});

async function fetchRandomQuote() {
    try {
        const response = await fetch('/api/quotes/random');
        const data = await response.json();
        const quote = data[0];
        document.getElementById('quote-text').textContent = `"${quote.q}"`;
        document.getElementById('quote-author').textContent = `- ${quote.a}`;
    } catch (error) {
        document.getElementById('quote-text').textContent = 'Failed to fetch quote';
        document.getElementById('quote-author').textContent = '';
        console.error('Error fetching quote:', error);
    }
}

async function searchByAuthor() {
    const author = document.getElementById('author-input').value;
    if (!author) return;

    try {
        const response = await fetch(`/api/quotes/author/${author}`);
        const data = await response.json();
        const resultsDiv = document.getElementById('search-results');
        resultsDiv.innerHTML = '';

        if (data.length === 0) {
            resultsDiv.textContent = 'No quotes found';
            return;
        }

        data.forEach(quote => {
            const quoteElem = document.createElement('p');
            quoteElem.textContent = `"${quote.q}" - ${quote.a}`;
            resultsDiv.appendChild(quoteElem);
        });
    } catch (error) {
        document.getElementById('search-results').textContent = 'Error fetching quotes';
        console.error('Error fetching quotes:', error);
    }
}
