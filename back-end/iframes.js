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
            case 'de-wiktionary':
                return `https://de.wiktionary.org/wiki/${encodedSearchTerm}`;
            case 'en-wiktionary':
                return `https://en.wiktionary.org/wiki/${encodedSearchTerm}`;
            case 'fr-wiktionary':
                return `https://fr.wiktionary.org/wiki/${encodedSearchTerm}`;
            case 'sk-wiktionary':
                return `https://sk.wiktionary.org/wiki/${encodedSearchTerm}`;
            case 'etymonline':
                return `https://www.etymonline.com/search?q=${encodedSearchTerm}`;
            case 'dict-de-ua':
                return `https://dict.com/%D0%BD%D1%96%D0%BC%D0%B5%D1%86%D1%8C%D0%BA%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D1%96%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B8/${encodedSearchTerm}`;
            case 'dict-en-ua':
                return `https://dict.com/%D0%B0%D0%BD%D0%B3%D0%BB%D1%96%D0%B8%D1%81%D1%8C%D0%BA%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D1%96%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B8/${encodedSearchTerm}`;
            case 'dict-fr-ua':
                return `https://dict.com/%D1%84%D1%80%D0%B0%D0%BD%D1%86%D1%83%D0%B7%D1%8C%D0%BA%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D1%96%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B8/${encodedSearchTerm}`;
            case 'dict-sk-ua':
                return `https://dict.com/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%86%D1%8C%D0%BA%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D1%96%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B8/${encodedSearchTerm}`;
            case 'de-wikipedia':
                return `https://de.wikipedia.org/wiki/${encodedSearchTerm}`;
            case 'en-wikipedia':
                return `https://en.wikipedia.org/wiki/${encodedSearchTerm}`;
            case 'fr-wikipedia':
                return `https://fr.wikipedia.org/wiki/${encodedSearchTerm}`;
            case 'sk-wikipedia':
                return `https://sk.wikipedia.org/wiki/${encodedSearchTerm}`;
            case 'glosbe-fr-ua':
                return `https://glosbe.com/fr/uk/${encodedSearchTerm}`;
            case 'conjugation-fr':
                return `https://conjugation-fr.com/conjugate.php?verb=${encodedSearchTerm}`;
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
                searchInput.blur();
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


// Collapsible bar functionality
// This script handles the collapsible bar functionality for the 'More' options link
document.addEventListener('DOMContentLoaded', () =>{
    // Get references to the clickable link and the collapsible bar
    const moreOptionsLink = document.querySelector('.more-options-link');
    const collapsibleMoreBar = document.querySelector('.collapsible-more-bar');

    // Check if both elements exist before adding event listeners
    if (moreOptionsLink && collapsibleMoreBar) {
        // Add click event listener to the 'More' link
        moreOptionsLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior (e.g., jumping to top)
            // Toggle the 'show' class on the collapsible bar
            collapsibleMoreBar.classList.toggle('show');
        });

        // Optional: Add a click listener to the document to close the bar
        // when clicking anywhere outside of the trigger or the bar itself
        document.addEventListener('click', function(event) {
            const isClickInsideTrigger = moreOptionsLink.contains(event.target);
            const isClickInsideBar = collapsibleMoreBar.contains(event.target);

            // If the click is outside both the trigger and the bar, and the bar is currently open
            if (!isClickInsideTrigger && !isClickInsideBar && collapsibleMoreBar.classList.contains('show')) {
                collapsibleMoreBar.classList.remove('show'); // Hide the bar
            }
        });
    } else {
                console.error("Error: Could not find one or both elements for collapsible menu. Check HTML class names.");
                if (!moreOptionsLink) console.error("Missing .more-options-link-trigger");
                if (!collapsibleMoreBar) console.error("Missing .collapsible-more-bar");
    }
});

//Clear search input on button click
const inputToClear = document.getElementById('search-input');
const clearBtn = document.getElementById('clear-button');

inputToClear.addEventListener('input', () => {
clearBtn.style.display = inputToClear.value ? 'block' : 'none';
});

clearBtn.addEventListener('click', () => {
inputToClear.value = '';
clearBtn.style.display = 'none';
inputToClear.focus(); // Optional: bring back focus
});