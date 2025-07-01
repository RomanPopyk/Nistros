// Update links and text with search input dynamically
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-field');
    const searchButton = document.querySelector('.update-button');
    const dynamicIframes = document.querySelectorAll('.dynamic-iframe');
    const collapsibleLinks = document.querySelectorAll('.collapsible-icon-link');
    const originalTitle = document.title;

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
            case 'google-images-fr':
                return `https://www.google.com/search?udm=2&q=${encodedSearchTerm}%20site:.fr`;
            case 'google-images-sk':
                return `https://www.google.com/search?udm=2&q=${encodedSearchTerm}%20site:.sk`;
            case 'e2u':
                return `https://e2u.org.ua/s?w=${encodedSearchTerm}&dicts=all&highlight=on&filter_lines=on`;
            case 'reverso-fr-ua':
                return `https://context.reverso.net/translation/french-ukrainian/${encodedSearchTerm}`;
            case 'forvo':
                return `https://forvo.com/search/${encodedSearchTerm}`;
            case 'cnrtl-etymology':
                return `https://www.cnrtl.fr/etymologie/${encodedSearchTerm}`;
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
    const updateLinks = () => {
        const searchTerm = searchInput.value;
        if (!searchTerm || searchTerm.trim() === '') {
            alert("Please enter a search term.");
            return; 
        }
        // Update iframe links
        dynamicIframes.forEach(iframe => {
            const targetSite = iframe.dataset.targetSite; // Access data-target-site attribute
            const newUrl = generateSiteUrl(targetSite, searchTerm);
            // Update the iframe source only if a valid URL was generated.
            if (newUrl) {
                iframe.src = newUrl;
            }
        });
        // Update external links
        collapsibleLinks.forEach(a => {
            const targetSite = a.dataset.targetSite; // Access data-target-site attribute
            const newUrl = generateSiteUrl(targetSite, searchTerm);
            // Update the external link only if a valid URL was generated.
            if (newUrl) {
                a.href = newUrl;
            }
        });
        // Update the page title with the search term
        updatePageTitle(searchTerm);
    };
    const updatePageTitle = (searchTerm) => {
        if (searchTerm.trim() !== '') {
            document.title = `${searchTerm} - ${originalTitle}`;
        } else {
            document.title = originalTitle; // Revert to original if search term is empty
        }
    };

    // Event listener for search button click
    if (searchButton) {
        searchButton.addEventListener('click', () => {
        updateLinks();
        });
    };

    // Update on 'Enter' key press in search field
    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission if inside a form
                searchInput.blur();
                updateLinks();
            }
        });
    }; 
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
// This script handles the collapsible bar functionality for the 'More' options link and 'Settings' link
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the clickable links and the collapsible bars
    const moreOptionsButtonContainer = document.querySelector('.more-resources-button-container');
    const moreOptionsLink = document.querySelector('.more-resources-link');
    const collapsibleMoreBar = document.querySelector('.collapsible-more-bar');

    const settingsButtonContainer = document.querySelector('.settings-button-container');
    const settingsLink = document.querySelector('.settings-link');
    const collapsibleSettingsBar = document.querySelector('.collapsible-settings-bar');

    /**
     * Toggles the visibility of a collapsible bar and updates the active state of its button.
     * Optionally applies a 'no-transition' class for an instant open/close.
     * @param {HTMLElement} barElement - The collapsible bar HTML element.
     * @param {HTMLElement} buttonContainerElement - The button container HTML element associated with the bar.
     * @param {boolean} [instant=false] - If true, apply 'no-transition' for an instant action.
     */
    function toggleCollapsibleBar(barElement, buttonContainerElement, instant = false) {
        if (!barElement || !buttonContainerElement) return;

        // Apply 'no-transition' if an instant action is requested
        if (instant) {
            barElement.classList.add('no-transition');
        }

        const isShowing = barElement.classList.toggle('show');

        // Update active state of the button
        if (isShowing) {
            buttonContainerElement.classList.add('is-active');
        } else {
            buttonContainerElement.classList.remove('is-active');
        }

        // If 'no-transition' was just applied (for an instant action), remove it after a short delay
        // This ensures the browser applies the instant change, but future actions use normal transitions.
        if (instant) {
            setTimeout(() => {
                barElement.classList.remove('no-transition');
            }, 50); // A small delay to allow the browser to process the class removal
        }
    }

    /**
     * Closes a specific collapsible bar, removes its button's active state,
     * and optionally applies a 'no-transition' class for an instant close.
     * @param {HTMLElement} barElement - The collapsible bar HTML element to close.
     * @param {HTMLElement} buttonContainerElement - The button container HTML element associated with the bar.
     * @param {boolean} [instant=false] - If true, close immediately without transition.
     */
    function closeSpecificCollapsibleBar(barElement, buttonContainerElement, instant = false) {
        if (barElement && buttonContainerElement && barElement.classList.contains('show')) {
            if (instant) {
                barElement.classList.add('no-transition'); // Add class to disable transition
            }
            barElement.classList.remove('show');
            buttonContainerElement.classList.remove('is-active');

            // If we added 'no-transition', remove it after a short delay
            // to allow future openings/closings to use the normal transition.
            if (instant) {
                setTimeout(() => {
                    barElement.classList.remove('no-transition');
                }, 50); // A small delay is often needed for browser repaint cycle
            }
        }
    }

    // --- More Options Link ---
    if (moreOptionsLink && collapsibleMoreBar && moreOptionsButtonContainer) {
        moreOptionsLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            
            const settingsBarWasOpen = collapsibleSettingsBar && collapsibleSettingsBar.classList.contains('show');
            const moreBarIsCurrentlyOpen = collapsibleMoreBar.classList.contains('show');

            if (settingsBarWasOpen) {
                // If Settings bar is open, close it instantly to make way for 'More'
                closeSpecificCollapsibleBar(collapsibleSettingsBar, settingsButtonContainer, true);
            }
            
            let instantOpenMoreBar = false;
            // If the 'More' bar is currently closed, AND the 'Settings' bar was open (indicating a switch)
            if (!moreBarIsCurrentlyOpen && settingsBarWasOpen) {
                instantOpenMoreBar = true; // This means 'More' should open instantly
            }
            // If 'More' is already open (clicking to close), or no other bar was open (first time open),
            // instantOpenMoreBar remains false, allowing normal transition.

            toggleCollapsibleBar(collapsibleMoreBar, moreOptionsButtonContainer, instantOpenMoreBar);
        });
    } else {
        console.error("Error: Could not find one or more elements for 'More' collapsible menu.");
        if (!moreOptionsLink) console.error("Missing .more-resources-link");
        if (!collapsibleMoreBar) console.error("Missing .collapsible-more-bar");
        if (!moreOptionsButtonContainer) console.error("Missing .more-resources-button-container");
    }

    // --- Settings Link ---
    if (settingsLink && collapsibleSettingsBar && settingsButtonContainer) {
        settingsLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior

            const moreBarWasOpen = collapsibleMoreBar && collapsibleMoreBar.classList.contains('show');
            const settingsBarIsCurrentlyOpen = collapsibleSettingsBar.classList.contains('show');

            if (moreBarWasOpen) {
                // If More bar is open, close it instantly to make way for 'Settings'
                closeSpecificCollapsibleBar(collapsibleMoreBar, moreOptionsButtonContainer, true);
            }

            let instantOpenSettingsBar = false;
            // If the 'Settings' bar is currently closed, AND the 'More' bar was open (indicating a switch)
            if (!settingsBarIsCurrentlyOpen && moreBarWasOpen) {
                instantOpenSettingsBar = true; // This means 'Settings' should open instantly
            }
            // If 'Settings' is already open (clicking to close), or no other bar was open (first time open),
            // instantOpenSettingsBar remains false, allowing normal transition.

            toggleCollapsibleBar(collapsibleSettingsBar, settingsButtonContainer, instantOpenSettingsBar);
        });
    } else {
        console.error("Error: Could not find one or more elements for 'Settings' collapsible menu.");
        if (!settingsLink) console.error("Missing .settings-link");
        if (!collapsibleSettingsBar) console.error("Missing .collapsible-settings-bar");
        if (!settingsButtonContainer) console.error("Missing .settings-button-container");
    }

    // --- Document Click Listener to Close Bars ---
    // These actions should always result in a normal, animated close.
    document.addEventListener('click', function(event) {
        // Close 'More' bar if click is outside its trigger and bar, and it's currently open
        const isClickInsideMoreTrigger = moreOptionsLink && moreOptionsLink.contains(event.target);
        const isClickInsideMoreBar = collapsibleMoreBar && collapsibleMoreBar.contains(event.target);
        if (collapsibleMoreBar && collapsibleMoreBar.classList.contains('show') && !isClickInsideMoreTrigger && !isClickInsideMoreBar) {
            closeSpecificCollapsibleBar(collapsibleMoreBar, moreOptionsButtonContainer, false); // Normal close
        }

        // Close 'Settings' bar if click is outside its trigger and bar, and it's currently open
        const isClickInsideSettingsTrigger = settingsLink && settingsLink.contains(event.target);
        const isClickInsideSettingsBar = collapsibleSettingsBar && collapsibleSettingsBar.contains(event.target);
        if (collapsibleSettingsBar && collapsibleSettingsBar.classList.contains('show') && !isClickInsideSettingsTrigger && !isClickInsideSettingsBar) {
            closeSpecificCollapsibleBar(collapsibleSettingsBar, settingsButtonContainer, false); // Normal close
        }
    });
});



//Clear search input on button click
const inputToClear = document.getElementById('search-input');
const clearBtn = document.getElementById('clear-button');

// Function to update clear button visibility
function updateClearButton() {
    clearBtn.style.display = inputToClear.value ? 'block' : 'none';
}
// Listen for multiple events to catch all input changes
inputToClear.addEventListener('input', updateClearButton);
inputToClear.addEventListener('change', updateClearButton);
inputToClear.addEventListener('autocomplete', updateClearButton);
inputToClear.addEventListener('focus', updateClearButton);

clearBtn.addEventListener('click', () => {
    inputToClear.value = '';
    clearBtn.style.display = 'none';
    inputToClear.focus(); // Optional: bring back focus
});
// Initial check on page load
updateClearButton();
