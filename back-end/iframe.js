// Iframes for German language resources
document.getElementById('search-button').addEventListener('click', function() {
    const word = document.getElementById('search-input').value.trim();
    if (word) {
    // Update English Wiktionary iframe
    document.getElementById('en-wiktionary-iframe').src = `https://en.wiktionary.org/wiki/${encodeURIComponent(word)}`;
    // Update German Wiktionary iframe
    document.getElementById('de-wiktionary-iframe').src = `https://de.wiktionary.org/wiki/${encodeURIComponent(word)}`;
    // Update Etymonline iframe
    document.getElementById('etymonline-iframe').src = `https://www.etymonline.com/search?q=${encodeURIComponent(word)}`;
    // Update Dict.com iframe
    document.getElementById('dict-iframe').src = `https://dict.com/%D0%BD%D1%96%D0%BC%D0%B5%D1%86%D1%8C%D0%BA%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D1%96%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B8/${encodeURIComponent(word)}`
    // Update German Wikipedia iframe
    document.getElementById('de-wikipedia-iframe').src = `https://de.wikipedia.org/wiki/${encodeURIComponent(word)}`;
    } else {
    // Optionally, you can show an error or clear the iframes if input is empty
    // Example: clear the iframes
    document.getElementById('en-wiktionary-iframe').src = '';
    document.getElementById('de-wiktionary-iframe').src = '';
    document.getElementById('etymonline-iframe').src = '';
    document.getElementById('dict-iframe').src = '';
    document.getElementById('de-wikipedia-iframe').src = '';
    return;
    }
});

// Iframes for French language resources
document.getElementById('search-button').addEventListener('click', function() {
    const word = document.getElementById('search-input').value.trim();
    if (word) {
    // Update English Wiktionary iframe
    document.getElementById('en-wiktionary-iframe').src = `https://en.wiktionary.org/wiki/${encodeURIComponent(word)}`;
    // Update French Wiktionary iframe
    document.getElementById('fr-wiktionary-iframe').src = `https://fr.wiktionary.org/wiki/${encodeURIComponent(word)}`;
    // Update Etymonline iframe
    document.getElementById('etymonline-iframe').src = `https://www.etymonline.com/search?q=${encodeURIComponent(word)}`;
    // Update Dict.com iframe
    document.getElementById('dict-iframe').src = `https://dict.com/%D1%84%D1%80%D0%B0%D0%BD%D1%86%D1%83%D0%B7%D1%8C%D0%BA%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D1%96%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B8/${encodeURIComponent(word)}`
    // Update French Wikipedia iframe
    document.getElementById('fr-wikipedia-iframe').src = `https://fr.wikipedia.org/wiki/${encodeURIComponent(word)}`;
    } else {
    // Optionally, you can show an error or clear the iframes if input is empty
    // Example: clear the iframes
    document.getElementById('en-wiktionary-iframe').src = '';
    document.getElementById('fr-wiktionary-iframe').src = '';
    document.getElementById('etymonline-iframe').src = '';
    document.getElementById('dict-iframe').src = '';
    document.getElementById('fr-wikipedia-iframe').src = '';
    return;
    }
});

document.getElementById('search-button').addEventListener('click', function() {
    const word = document.getElementById('search-input').value.trim();
    if (word) {
        const etymonlineIframe = document.getElementById('etymonline-iframe');
        etymonlineIframe.onload = function() {
            const iframeDocument = etymonlineIframe.contentDocument || etymonlineIframe.contentWindow.document;
            const bodyContent = iframeDocument.body.textContent || iframeDocument.body.innerText;

            if (bodyContent.includes('No results were found') || bodyContent.includes('Page not found')) {
                etymonlineIframe.style.display = 'none';
            } else {
                etymonlineIframe.style.display = 'block';
            }
        };
        etymonlineIframe.src = `https://www.etymonline.com/search?q=${encodeURIComponent(word)}`;
    }
});