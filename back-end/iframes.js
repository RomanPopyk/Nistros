// Update language iframes dynamically
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-field');
    const searchButton = document.querySelector('.update-button');
    const dynamicIframes = document.querySelectorAll('.dynamic-iframe');

    // Function to generate site-specific URLs
    const generateSiteUrl = (siteName, searchTerm) => {

        // Sanitize search term: trim whitespace and convert to lowercase for consistency
        const processedSearchTerm = searchTerm.trim().toLowerCase();
        let encodedSearchTerm = encodeURIComponent(processedSearchTerm);

        switch (siteName) {
            case 'en-wiktionary':
                return `https://en.wiktionary.org/wiki/${encodedSearchTerm}`;
            case 'fr-wiktionary':
                return `https://fr.wiktionary.org/wiki/${encodedSearchTerm}`;
            case 'etymonline':
                return `https://www.etymonline.com/search?q=${encodedSearchTerm}`;
            case 'dict-fr-ua':
                return `https://dict.com/%D1%84%D1%80%D0%B0%D0%BD%D1%86%D1%83%D0%B7%D1%8C%D0%BA%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D1%96%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B8/${encodedSearchTerm}`;
            case 'fr-wikipedia':
                return `https://fr.wikipedia.org/wiki/${encodedSearchTerm}`;
            default:
                // Log a warning for unhandled sites to make debugging easier.
                console.warn(`Unknown target site: ${siteName}. Cannot generate URL.`);
                return '';
        }
    };
    /**
     * Iterates through all dynamic iframes and updates their src attribute
     * based on the current search term.
     */
    const updateIframes = () => {
        const searchTerm = searchInput.value;
        if (!searchTerm || searchTerm.trim() === '') {
            alert("Please enter a search term.");
            return; 
        }

        dynamicIframes.forEach(iframe => {
            const targetSite = iframe.dataset.targetSite; // Access data-target-site attribute
            const newUrl = generateSiteUrl(targetSite, searchTerm);
            // Update the iframe source only if a valid URL was generated.
            if (newUrl) {
                iframe.src = newUrl;
            }
        });
    };

    // Event listener for search button click
    if (searchButton) {
        searchButton.addEventListener('click', updateIframes);
    }

    // Update on 'Enter' key press in search field
    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission if inside a form
                updateIframes();
            }
        });
    }
});

// Layout switching
function switchLayout(layoutType) {
    // Hide all layouts
    document.getElementById('tab-layout').style.display = 'none';
    document.getElementById('grid-layout').classList.remove('active');
    
    // Remove active class from all layout options
    document.querySelectorAll('.iframe-layout-option').forEach(option => {
        option.classList.remove('active');
    });
    
    // Show selected layout
    if (layoutType === 'iframe-tabs') {
        document.getElementById('tab-layout').style.display = 'block';
        document.querySelector('.iframe-layout-option:nth-child(1)').classList.add('active');
    } else if (layoutType === 'grid') {
        document.getElementById('grid-layout').classList.add('active');
        document.querySelector('.iframe-layout-option:nth-child(2)').classList.add('active');
    } 
    
    // Update radio button
    document.getElementById(layoutType).checked = true;
}

// Tab switching
function switchTab(tabClass, clickedButton) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab by its class
    const selectedTabContent = document.querySelector(`.${tabClass}.tab-content`);
    if (selectedTabContent) {
        selectedTabContent.classList.add('active');
    } else {
        console.warn(`Tab content with class '${tabClass}' not found.`);
    }

    // Add active class to the clicked button
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}
window.switchTab = switchTab;